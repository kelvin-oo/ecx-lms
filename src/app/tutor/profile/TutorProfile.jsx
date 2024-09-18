"use client";
import FormBox from "@/components/profile/FormBox";
import FormBoxHeader from "@/components/profile/FormBoxHeader";
import FormImageInput from "@/components/profile/FormImageInput";
import React, { useState } from "react";
import styles from "../../../styles/adminProfilePage.module.scss";
import { useCurrentClientUser } from "@/hooks/use-current-client-user";
import Image from "next/image";
import FormInput from "@/components/profile/FormInput";
import Link from "next/link";

const TutorProfile = ({ participantCount, highestScoreParticipant, highestTaskParticipant, ungradedTaskCount }) => {
  const user = useCurrentClientUser()
  return (
    <main className={styles.main}>
      <div className={styles.header}>
        <div className="relative w-20 h-20 lg:w-[8.3125rem] lg:h-[8.3125rem] bg-ecx-colors-black rounded-full">
          <Image src={user?.image} alt="" className="w-[100%] h-[100%] rounded-full object-fill bg-cover"  width={200} height={200}/>
        </div>
        <Link href="/tutor/profile/edit">Edit Profile</Link>
      </div>
      <form className="grid grid-cols-1 gap-y-10 pb-8">
        {/* personal information */}

        <div className="information">
          <FormBox>
            <FormBoxHeader header={`Personal Information`} />
            <div className="grid grid-cols-1 gap-y-4">
              <FormInput placeholder={`Name -- ${user.firstName} ${user.lastName}`} type="name" disabled={true}/>
              <FormInput placeholder={`Email -- ${user.email}`}type="email" disabled={true}/>
              <FormInput placeholder={`Role -- ${user.role}`} type="text" disabled={true}/>
            </div>
          </FormBox>
        </div>

        {/* Tutor-Specific Details */}
        <div className={styles.details}>
          <FormBoxHeader header={`Tutor-Specific Details`} />
          <div className={styles.detailsBox}>
            <h3>Your Assigned Track</h3>
            <h3> {user.track}</h3>
          </div>
          <div className={styles.detailsBox}>
            <p>Number of Participants in Your Track</p>
            <p> {participantCount.success}</p>
          </div>
          <div className={styles.detailsBox}>
            <p>Tasks Graded Today</p>
            <p> 0</p>
          </div>
          <div className={styles.detailsBox}>
            <p>Pending Tasks to Grade</p>
            <p> {ungradedTaskCount.success}</p>
          </div>
        </div>

        {/* Participant Performance */}

        <div className={styles.performance}>
          <FormBoxHeader header={`Participant Performance`} />
          <div className={styles.performanceBox}>
            <div className={styles.left}>
              <h3>Highest Scorer:</h3>
              <h3>Score</h3>
            </div>
            <div className={styles.right}>
              <h3>{highestScoreParticipant.success.firstName}</h3>
              <h3>{highestScoreParticipant.success.points}</h3>
            </div>
          </div>
          <div className={styles.performanceBox}>
            <div className={styles.left}>
              <h3>Most Active Participant</h3>
              <h3>Tasks Completed</h3>
            </div>
            <div className={styles.right}>
              <h3>{highestTaskParticipant.success.firstName}</h3>
              <h3>{highestTaskParticipant.success.taskCompleted}</h3>
            </div>
          </div>
        </div>
      </form>
    </main>
  );
};

export default TutorProfile;
