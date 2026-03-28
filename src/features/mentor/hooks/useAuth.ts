
import { useMutation } from "@tanstack/react-query";
import { mentorLoginService } from "../services/auth.service";

export const useMentorLogin = () =>
  useMutation({
    mutationFn: mentorLoginService,
  });