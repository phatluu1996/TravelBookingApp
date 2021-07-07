package com.travelbooking.backend.specification;

import org.springframework.data.jpa.domain.Specification;
import org.springframework.ui.Model;

import java.util.Optional;

public final class DBSpecification {
    public static Specification<?> createSpecification(Optional<Boolean> retired){
        return Specification.where(isRetired(retired));
    }

    public static Specification<?> isRetired(Optional<Boolean> retired) {
        return (root, cq, cb) -> retired.map(rootName -> cb.equal(root.get("retired"), retired)).orElse(null);
    }
}
