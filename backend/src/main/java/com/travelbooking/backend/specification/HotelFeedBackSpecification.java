package com.travelbooking.backend.specification;

import com.travelbooking.backend.models.Hotel;
import com.travelbooking.backend.models.HotelFeedBack;
import org.springframework.data.jpa.domain.Specification;

import java.util.Date;

public class HotelFeedBackSpecification {
    public static Specification<HotelFeedBack> createSpecification(Long id, boolean retired){
        return Specification.where(
                        findList(id)
                        .and(isRetired(retired)));
    }

    public static Specification<HotelFeedBack> findList(Long id) {
        return (hotelFeedBackRoot, cq, cb) ->cb.equal(hotelFeedBackRoot.get("hotel"), id);
    }
    public static Specification<HotelFeedBack> isRetired(Boolean retired) {
        return (hotelFeedBackRoot, cq, cb) -> retired != null ? cb.equal(hotelFeedBackRoot.get("retired"), retired) : null;
    }
}
