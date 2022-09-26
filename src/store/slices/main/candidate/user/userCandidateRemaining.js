import { createSelector } from '@reduxjs/toolkit';

export const nameFilterChange = (state) => state.userFilter.name;
export const majorFilterChange = (state) => state.userFilter.major;
export const allUser = (state) => state.userFilter;

export const userCandidateRemainingSelector = createSelector(
    nameFilterChange,
    majorFilterChange,
    allUser,
  (name, major, allUser) => {
    console.log(name)
    console.log(major)
    console.log(allUser)
    return allUser.filter((user)=>{
        return allUser
    })

  }
);