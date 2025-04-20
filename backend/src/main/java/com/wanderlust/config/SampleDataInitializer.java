// backend\src\main\java\com\wanderlust\config\SampleDataInitializer.java

package com.wanderlust.config;

import com.wanderlust.model.*;
import com.wanderlust.repository.*;
import jakarta.annotation.PostConstruct;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.context.annotation.Profile;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.util.HashSet;
import java.util.Set;

@Component
@RequiredArgsConstructor
@Slf4j
@Profile("dev") // Only run in development profile
public class SampleDataInitializer {
    private final UserRepository userRepository;
    private final RoleRepository roleRepository;
    private final DestinationRepository destinationRepository;
    private final AttractionRepository attractionRepository;
    private final HotelRepository hotelRepository;
    private final RestaurantRepository restaurantRepository;
    private final FlightRepository flightRepository;
    private final PasswordEncoder passwordEncoder;

    @PostConstruct
    @Transactional
    public void init() {
        if (userRepository.count() > 0) {
            log.info("Database already initialized with data");
            return;
        }
        
        log.info("Initializing database with sample data");
        
        // Create users
        createUsers();
        
        // Create destinations
        createDestinations();
        
        // Create flights
        createFlights();
        
        log.info("Finished initializing sample data");
    }
    
    private void createUsers() {
        Role adminRole = roleRepository.findByName(Role.ERole.ROLE_ADMIN)
                .orElseGet(() -> roleRepository.save(new Role(null, Role.ERole.ROLE_ADMIN)));
        
        Role userRole = roleRepository.findByName(Role.ERole.ROLE_USER)
                .orElseGet(() -> roleRepository.save(new Role(null, Role.ERole.ROLE_USER)));
        
        // Create admin user
        if (!userRepository.existsByUsername("admin")) {
            Set<Role> adminRoles = new HashSet<>();
            adminRoles.add(adminRole);
            
            User admin = User.builder()
                    .username("admin")
                    .firstName("Admin")
                    .lastName("User")
                    .email("admin@example.com")
                    .password(passwordEncoder.encode("admin123"))
                    .roles(adminRoles)
                    .build();
            
            userRepository.save(admin);
            log.info("Created admin user");
        }
        
        // Create regular user
        if (!userRepository.existsByUsername("user")) {
            Set<Role> userRoles = new HashSet<>();
            userRoles.add(userRole);
            
            User user = User.builder()
                    .username("user")
                    .firstName("Regular")
                    .lastName("User")
                    .email("user@example.com")
                    .password(passwordEncoder.encode("user123"))
                    .roles(userRoles)
                    .build();
            
            userRepository.save(user);
            log.info("Created regular user");
        }
    }
    
    private void createDestinations() {
        // Add more destinations to ensure we have data for all continents
        
        // Europe
        createDestination("Paris", "France", "Europe", 
            "Paris, the City of Light, is a global center for art, fashion, gastronomy, and culture.",
            new BigDecimal("80999"), "Popular");
            
        createDestination("Rome", "Italy", "Europe", 
            "Ancient ruins, Renaissance art, and delicious Italian food.",
            new BigDecimal("70999"), "Historic");
            
        createDestination("Barcelona", "Spain", "Europe", 
            "Gaudi architecture, Mediterranean beaches, and vibrant culture.",
            new BigDecimal("64999"), null);
        
        // Asia
        createDestination("Tokyo", "Japan", "Asia", 
            "Ultra-modern meets traditional in this dynamic metropolis.",
            new BigDecimal("109999"), "Trending");
            
        createDestination("Kyoto", "Japan", "Asia", 
            "Ancient temples, traditional gardens, and cherry blossoms.",
            new BigDecimal("99999"), "Cultural");
            
        createDestination("Bangkok", "Thailand", "Asia", 
            "Bustling street life, ornate shrines, and amazing street food.",
            new BigDecimal("84999"), null);
        
        // North America
        createDestination("New York", "United States", "North America", 
            "The Big Apple with iconic skyline, Broadway, and Central Park.",
            new BigDecimal("159999"), "City Break");
            
        createDestination("Vancouver", "Canada", "North America", 
            "Modern city surrounded by mountains and stunning nature.",
            new BigDecimal("80999"), "Nature");
            
        createDestination("Cancun", "Mexico", "North America", 
            "White sand beaches, turquoise waters, and Mayan ruins.",
            new BigDecimal("74999"), "Beach");
        
        // South America
        createDestination("Rio de Janeiro", "Brazil", "South America", 
            "Spectacular beaches, dramatic mountains, and samba culture.",
            new BigDecimal("100999"), null);
            
        createDestination("Buenos Aires", "Argentina", "South America", 
            "Tango, European architecture, and vibrant nightlife.",
            new BigDecimal("109999"), "Culture");
        
        // Africa
        createDestination("Cape Town", "South Africa", "Africa", 
            "Stunning coastal scenery, Table Mountain, and wildlife.",
            new BigDecimal("129999"), "Adventure");
            
        createDestination("Marrakech", "Morocco", "Africa", 
            "Ancient medina, colorful souks, and rich cultural heritage.",
            new BigDecimal("84999"), "Exotic");
        
        // Oceania
        createDestination("Sydney", "Australia", "Oceania", 
            "Iconic harbor, beautiful beaches, and vibrant culture.",
            new BigDecimal("129999"), "Nature");
            
        createDestination("Auckland", "New Zealand", "Oceania", 
            "City of sails surrounded by stunning natural landscapes.",
            new BigDecimal("139999"), "Adventure");
        
        log.info("Created sample destinations for all continents");

        addParisDetails();
    }
    
    private Destination createDestination(String name, String country, String continent, 
                                       String description, BigDecimal price, String badge) {
        Destination destination = Destination.builder()
                .name(name)
                .country(country)
                .continent(continent)
                .description(description)
                .imageUrl("/images/defaultDestin.png")
                .priceStarting(price)
                .badge(badge)
                .build();
                
        return destinationRepository.save(destination);
    }

    private void addParisDetails() {
        Destination paris = destinationRepository.findByNameContainingIgnoreCase("Paris")
                .stream()
                .findFirst()
                .orElseThrow(() -> new IllegalStateException("Paris not found"));
    
        // Attractions
        attractionRepository.save(Attraction.builder()
                .name("Eiffel Tower")
                .rating(4.7)
                .imageUrl("/images/eiffel.jpg")
                .destination(paris)
                .build());
    
        attractionRepository.save(Attraction.builder()
                .name("Louvre Museum")
                .rating(4.8)
                .imageUrl("/images/louvre.jpg")
                .destination(paris)
                .build());
    
        // Hotels
        hotelRepository.save(Hotel.builder()
                .name("Hotel de Crillon")
                .rating(4.9)
                .pricePerNight(new BigDecimal("650"))
                .imageUrl("/images/hotelDeCrillion.png")
                .destination(paris)
                .build());
    
        hotelRepository.save(Hotel.builder()
                .name("Le Meurice")
                .rating(4.8)
                .pricePerNight(new BigDecimal("580"))
                .imageUrl("/images/leMurice.jpg")
                .destination(paris)
                .build());
    
        // Restaurants
        restaurantRepository.save(Restaurant.builder()
                .name("Le Jules Verne")
                .cuisine("French")
                .rating(4.7)
                .price("$$$")
                .imageUrl("/images/LeJules.png")
                .destination(paris)
                .build());
    
        restaurantRepository.save(Restaurant.builder()
                .name("L'Ambroisie")
                .cuisine("French")
                .rating(4.8)
                .price("$$$$")
                .imageUrl("/images/ambroisie.jpg")
                .destination(paris)
                .build());
    
        log.info("Added sample attractions, hotels, and restaurants for Paris");
    }
    
    
    private void createFlights() {
        // New York to Paris
        flightRepository.save(Flight.builder()
                .airline("Air France")
                .airlineLogoUrl("/images/flights/AirFrance.png")
                .flightNumber("AF1234")
                .departureTime(LocalDateTime.of(LocalDate.now().plusDays(30), LocalTime.of(8, 45)))
                .departureAirport("JFK")
                .departureCity("New York")
                .arrivalTime(LocalDateTime.of(LocalDate.now().plusDays(30), LocalTime.of(21, 30)))
                .arrivalAirport("CDG")
                .arrivalCity("Paris")
                .duration("7h 45m")
                .stops(0)
                .price(new BigDecimal("649"))
                .deal("Best Deal")
                .build());
        
        flightRepository.save(Flight.builder()
                .airline("British Airways")
                .airlineLogoUrl("/images/flights/british-airways-logo.png")
                .flightNumber("BA1432")
                .departureTime(LocalDateTime.of(LocalDate.now().plusDays(30), LocalTime.of(10, 15)))
                .departureAirport("JFK")
                .departureCity("New York")
                .arrivalTime(LocalDateTime.of(LocalDate.now().plusDays(30), LocalTime.of(23, 45)))
                .arrivalAirport("CDG")
                .arrivalCity("Paris")
                .duration("8h 30m")
                .stops(1)
                .stopAirport("LHR")
                .price(new BigDecimal("589"))
                .build());
        
        log.info("Created sample flights");
    }
}