package edu.infosys.lostFoundLocatorApplication.controller;

import java.util.Collections;
import java.util.HashMap;
import java.util.HashSet;
import java.util.Map;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.messaging.simp.stomp.StompHeaderAccessor;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import edu.infosys.lostFoundLocatorApplication.bean.ChatMessage;

@RestController
@RequestMapping("/lostfound/")
@CrossOrigin(origins = "http://localhost:3535", allowCredentials = "true")
public class ChatController {

	@Autowired
	private SimpMessagingTemplate messagingTemplate;

	private final Set<String> onlineUsers = Collections.synchronizedSet(new HashSet<>());
	private final Map<String, String> sessionIdToUser = Collections.synchronizedMap(new HashMap<>());

	@GetMapping("/users")
	public Set<String> getOnlineUsers() {
		return onlineUsers;
	}

	@MessageMapping("/register")
	public void register(ChatMessage message, StompHeaderAccessor headerAccessor) {
		String sessionId = headerAccessor.getSessionId();
		String username = message.getSender();
		if (username != null && !username.trim().isEmpty()) {
			onlineUsers.add(username.trim());
			if (sessionId != null) {
				sessionIdToUser.put(sessionId, username.trim());
			}
			broadcastUserList();
		}
	}

	@MessageMapping("/sendMessage")
	public void sendMessage(ChatMessage message) {
		messagingTemplate.convertAndSend("/topic/messages", message);
	}

	public void removeUser(String sessionId) {
		String username = sessionIdToUser.remove(sessionId);
		if (username != null) {
			onlineUsers.remove(username);
			broadcastUserList();
		}
	}

	private void broadcastUserList() {
		messagingTemplate.convertAndSend("/topic/users", new HashSet<>(onlineUsers));
	}
}
