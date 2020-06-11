import React from "react";
import { useDispatch, useSelector } from "react-redux";

export const useForm = () => {
  const dispatch = useDispatch();

  const handleCreateNewMessage = (message: string) => {

  }

  return {
    handleCreateNewMessage
  };
}