package com.example.payrollsystem.security;


	import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

	public class Hash {
	    public static void main(String[] args) {
	        BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();
	        String hash = encoder.encode("password123");
	        System.out.println(hash);
	    }
	}

