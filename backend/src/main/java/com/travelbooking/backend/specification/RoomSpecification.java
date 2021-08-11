package com.travelbooking.backend.specification;

import com.travelbooking.backend.models.Hotel;
import com.travelbooking.backend.models.Room;
import org.springframework.data.jpa.domain.Specification;

import javax.persistence.criteria.Join;
import javax.persistence.criteria.Root;
import javax.persistence.criteria.Subquery;
import java.util.Date;
import java.util.List;

public final class RoomSpecification {
    public static Specification<Room> createSpecification(Long id
                                                            , Boolean retired){
        return Specification.where(isRetired(retired))
                          .and(listRoomWithId(id));
    }
    public static Specification<Room> getListRoomByListId(List<Long> id
            , Boolean retired){
        return Specification.where(isRetired(retired))
                .and(listRoomWithListId(id));
    }

    public static Specification<Room> listRoomWithId(Long id){
        return (room,cq,cb) -> {
            Join<Room,Hotel> joinTable = room.join("hotel");
            return cb.equal(joinTable.get("hotel"),id);
        };
    }

    public static Specification<Room> listRoomWithListId(List<?> ids){
        return (room,cq,cb)-> cb.in(room.get("id")).value(ids);
    }

    public static Specification<Room> isRetired(Boolean retired) {
        return (hotel, cq, cb) -> retired != null ? cb.equal(hotel.get("retired"), retired) : null;
    }
}
