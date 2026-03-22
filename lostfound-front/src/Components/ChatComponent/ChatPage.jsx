import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import SockJS from "sockjs-client";
import { Client } from "@stomp/stompjs";
import "../../App.css";
import { getUserId } from "../../Services/LoginService";
import { getOnlineUsers } from "../../Services/ChatService";

const WS_URL = "http://localhost:9595/lostfound/ws";

const ChatPage = () => {
  const navigate = useNavigate();
  const clientRef = useRef(null);
  const [username, setUsername] = useState("");
  const [connected, setConnected] = useState(false);
  const [messages, setMessages] = useState([]);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const [input, setInput] = useState("");
  const [msgType, setMsgType] = useState("Question");
  const [error, setError] = useState("");

  useEffect(() => {
    getUserId()
      .then((res) => setUsername(String(res.data || "")))
      .catch(() => setError("Could not load user. Please log in again."));
    getOnlineUsers()
      .then((res) => setOnlineUsers(Array.from(res.data || [])))
      .catch(() => {});
  }, []);

  useEffect(() => {
    if (!username) return;

    const client = new Client({
      webSocketFactory: () => new SockJS(WS_URL),
      reconnectDelay: 5000,
      heartbeatIncoming: 4000,
      heartbeatOutgoing: 4000,
      onConnect: () => {
        setConnected(true);
        setError("");
        client.subscribe("/topic/messages", (message) => {
          try {
            const body = JSON.parse(message.body);
            setMessages((prev) => [...prev, body]);
          } catch {
            /* ignore */
          }
        });
        client.subscribe("/topic/users", (message) => {
          try {
            const list = JSON.parse(message.body);
            setOnlineUsers(Array.isArray(list) ? list : [...list]);
          } catch {
            /* ignore */
          }
        });
        client.publish({
          destination: "/app/register",
          body: JSON.stringify({
            type: "join",
            sender: username,
            content: "",
          }),
        });
      },
      onStompError: (frame) => {
        setError(frame.headers?.message || "Chat connection error.");
        setConnected(false);
      },
      onWebSocketClose: () => setConnected(false),
    });

    client.activate();
    clientRef.current = client;

    return () => {
      client.deactivate();
      clientRef.current = null;
    };
  }, [username]);

  const sendMessage = (e) => {
    e.preventDefault();
    if (!input.trim() || !clientRef.current?.connected) return;
    clientRef.current.publish({
      destination: "/app/sendMessage",
      body: JSON.stringify({
        type: msgType,
        sender: username,
        content: input.trim(),
      }),
    });
    setInput("");
  };

  const goBack = () => {
    navigate(-1);
  };

  return (
    <div className="report-page">
      <div className="report-card" style={{ maxWidth: 900 }}>
        <h2 className="report-title">Lost &amp; Found Chat</h2>
        <p style={{ textAlign: "center", color: "#6b7280", marginBottom: 16 }}>
          {connected ? (
            <span className="text-success">Connected as {username}</span>
          ) : (
            <span>Connecting…</span>
          )}
        </p>
        {error && (
          <div className="text-danger" style={{ marginBottom: 12, textAlign: "center" }}>
            {error}
          </div>
        )}

        <div style={{ display: "flex", gap: 20, flexWrap: "wrap" }}>
          <div style={{ flex: "1 1 200px" }}>
            <h3 style={{ fontSize: 16, marginBottom: 8 }}>Online users</h3>
            <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
              {onlineUsers.map((u) => (
                <li key={u} style={{ padding: "4px 0", color: "#374151" }}>
                  {u}
                </li>
              ))}
              {onlineUsers.length === 0 && (
                <li style={{ color: "#9ca3af" }}>No users yet</li>
              )}
            </ul>
          </div>

          <div style={{ flex: "2 1 400px" }}>
            <div
              style={{
                border: "1px solid #e5e7eb",
                borderRadius: 12,
                height: 320,
                overflowY: "auto",
                padding: 12,
                background: "#f9fafb",
                marginBottom: 12,
                textAlign: "left",
              }}
            >
              {messages.map((m, i) => (
                <div key={i} style={{ marginBottom: 10, fontSize: 14 }}>
                  <strong style={{ color: "#1d4ed8" }}>{m.sender}</strong>
                  <span style={{ color: "#6b7280", marginLeft: 8 }}>[{m.type}]</span>
                  <div style={{ marginTop: 4, color: "#111827" }}>{m.content}</div>
                </div>
              ))}
            </div>

            <form onSubmit={sendMessage} className="content-card" style={{ padding: 16 }}>
              <div className="form-group">
                <label className="form-label">Message type</label>
                <select
                  className="form-control"
                  value={msgType}
                  onChange={(e) => setMsgType(e.target.value)}
                >
                  <option value="Question">Question</option>
                  <option value="Answer">Answer</option>
                </select>
              </div>
              <div className="form-group">
                <label className="form-label">Message</label>
                <input
                  className="form-control"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Type a message…"
                />
              </div>
              <button type="submit" className="btn-primary" disabled={!connected}>
                Send
              </button>
            </form>
          </div>
        </div>

        <div className="report-actions">
          <button type="button" className="btn-outline" onClick={goBack}>
            Back
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatPage;
