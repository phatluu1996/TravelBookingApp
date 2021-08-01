package com.travelbooking.backend.specification;

import com.travelbooking.backend.models.Flight;
import org.springframework.data.jpa.domain.Specification;

import java.util.Date;
import java.util.Optional;

public final class FlightSpecification {
    public static Specification<Flight> createSpecification(Optional<String> from,
                                                            Optional<String> to,
                                                            Optional<Integer> priceFrom,
                                                            Optional<Integer> priceTo,
                                                            Boolean isEconomy,
                                                            Boolean retired){
        return Specification.where(fromCityContains(from).and(toCityContains(to)).and(fromPrice(priceFrom, isEconomy)).and(toPrice(priceTo, isEconomy)).and(isRetired(retired)));
    }

    public static Specification<Flight> fromPrice(Optional<Integer> priceFrom,  boolean isEconomy){
        return (flight, cq, cb) -> priceFrom.map(name ->
                cb.greaterThanOrEqualTo(isEconomy ? flight.get("economyPrice") : flight.get("businessPrice"),name)).orElse(null);
    }

    public static Specification<Flight> toPrice(Optional<Integer> priceTo, boolean isEconomy){
        return (flight, cq, cb) -> priceTo.map(name ->
                cb.lessThanOrEqualTo(isEconomy ? flight.get("economyPrice") : flight.get("businessPrice"),name)).orElse(null);
    }

    public static Specification<Flight> fromCityContains(Optional<String> departureCity){
        return (flight, cq, cb) -> departureCity.map(name ->
                cb.equal(flight.get("departureCity"),name)).orElse(null);
    }

    public static Specification<Flight> toCityContains(Optional<String> arrivalCity){
        return (flight, cq, cb) -> arrivalCity.map(name ->
                cb.equal(flight.get("arrivalCity"), name)).orElse(null);
    }

    public static Specification<Flight> dateEqualTo(Optional<Date> dateOfDeparture){
        return (flight, cq, cb) -> dateOfDeparture.map(date ->
                cb.equal(flight.get("dateOfDeparture"), date)).orElse(null);
    }

    public static Specification<Flight> isRetired(Boolean retired) {
        return (flight, cq, cb) -> retired != null ? cb.equal(flight.get("retired"), retired) : null;
    }
}

