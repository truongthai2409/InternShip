import { createSelector } from "@reduxjs/toolkit";

export const nameFilterChange = (state) => state.userFilter.names;
export const majorFilterChange = (state) => state.userFilter.majors;
export const allUser = (state) => state.userFilter;

export const userCandidateRemainingSelector = createSelector(
  nameFilterChange,
  majorFilterChange,
  allUser,
  (names, majors, allUser) => {
    return allUser.allUser.filter((items) => items?.major?.name?.includes(majors)).filter((item)=> item?.user?.firstName?.includes(names) || item.user?.lastName?.includes(names)) 
  }
);
