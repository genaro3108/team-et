"use client";
import { useRouter } from "next/navigation";
import Image from "next/image";
import React, { use, useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { hints, entryAnimation } from "@/common/constants";
import "@/styles/styles.css";
import logo from "@/assets/logo.png";
import correct from "@/assets/correct.png";

const Hint = ({ params }) => {
  const router = useRouter();
  const { id } = use(params);
  const currentHint = hints.find((t) => t.id === id);
  const [isCorrectAnswer, setIsCorrectAnswer] = useState(null);

  if (!currentHint) return;

  const handleSubmit = (answer) => {
    if (!answer.trim().length) return;
    setIsCorrectAnswer(
      answer.trim().toUpperCase() === currentHint.answer.trim().toUpperCase()
    );
  };

  const Hint = ({ handleSubmit }) => {
    const [mounted, setMounted] = useState(false);
    const [answer, setAnswer] = useState("");

    useEffect(() => {
      setMounted(true);
      setAnswer("");
    }, []);

    return (
      <motion.div
        className="hint"
        initial={!mounted ? entryAnimation.initial : false}
        animate={entryAnimation.animate}
      >
        <p>{currentHint.hint}</p>
        <input
          type="text"
          value={answer}
          onChange={(e) => setAnswer(e.target.value)}
        />
        <button onClick={() => handleSubmit(answer)}>Submit</button>
      </motion.div>
    );
  };

  const WrongAnswer = ({ setIsCorrectAnswer }) => {
    if (isCorrectAnswer === null || isCorrectAnswer === true) return;
    return (
      <motion.div className="response" {...entryAnimation}>
        <p>Sorry, try again</p>
        <button onClick={() => setIsCorrectAnswer(null)}>Try Again</button>
      </motion.div>
    );
  };

  const Correct = () => {
    if (isCorrectAnswer === null || isCorrectAnswer === false) return;
    return (
      <motion.div className="response" {...entryAnimation}>
        <Image src={correct} alt="Correct" />
        <p>Correct</p>
        <span>Nicely done.</span>
      </motion.div>
    );
  };

  return (
    <div className="container">
      <Image src={logo} alt="Logo" className="logo" />
      {isCorrectAnswer === null && <Hint handleSubmit={handleSubmit} />}
      <WrongAnswer setIsCorrectAnswer={setIsCorrectAnswer}/>
      <Correct />
    </div>
  );
};

export default Hint;
