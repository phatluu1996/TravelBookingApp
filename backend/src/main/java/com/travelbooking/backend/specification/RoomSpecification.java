package com.travelbooking.backend.specification;

import com.travelbooking.backend.models.Hotel;
import com.travelbooking.backend.models.Room;
import org.springframework.data.jpa.domain.Specification;

import javax.persistence.criteria.Join;
import java.util.Date;

public final class RoomSpecification {
    public static Specification<Room> createSpecification(Long id
                                                            , Boolean retired){
        return Specification.where(isRetired(retired))
                          .and(listRoomWithId(id));
    }

    public static Specification<Room> listRoomWithId(Long id){
        return (room,cq,cb) -> {
            Join<Room,Hotel> joinTable = room.join("hotel");
            return cb.equal(joinTable.get("hotel"),id);
        };
    }

    public static Specification<Room> isRetired(Boolean retired) {
        return (hotel, cq, cb) -> retired != null ? cb.equal(hotel.get("retired"), retired) : null;
    }
}
