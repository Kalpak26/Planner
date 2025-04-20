// backend\src\main\java\com\wanderlust\config\JpaConfig.java

package com.wanderlust.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;

@Configuration
@EnableJpaAuditing
public class JpaConfig {
}