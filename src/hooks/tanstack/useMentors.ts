import { fetchMentors } from "@/services/mentors-service";
import { useQuery } from "@tanstack/react-query";


export const mentorKeys = {
    all: ["mentors"] as const
};

export const useMentors = () => {
    return useQuery({
        queryKey: mentorKeys.all,
        queryFn: fetchMentors,
    })
}