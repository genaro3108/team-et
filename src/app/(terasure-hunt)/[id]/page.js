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
  const [isFinalHint, setIsFinalHint] = useState(false);

  if (!currentHint) return;

  const handleSubmit = (answer) => {
    if (!answer.trim().length) return;
    if (currentHint.isFinalHint) {
      return setIsFinalHint(true);
    }
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

  const Congrats = () => {
    if (!isFinalHint) return;
    return (
      <motion.div className="congrats" {...entryAnimation}>
        <p>
          And just like that… we’ve completed our final adventure as boyfriend
          and girlfriend.
        </p>
        <p>
          Every clue, every step, every laugh led us here — through the moments
          that shaped our story.
        </p>
        <p>
          But this isn’t the end of the hunt. It’s the beginning of something
          even greater.
        </p>
        <p>
          Our next chapter starts now — the one we’ll write together, forever.
          ❤️
        </p>
      </motion.div>
    );
  };

  return (
    <div className="container">
      <Image src={logo} alt="Logo" className="logo" />
      {isCorrectAnswer === null && !isFinalHint && (
        <Hint handleSubmit={handleSubmit} />
      )}
      <WrongAnswer setIsCorrectAnswer={setIsCorrectAnswer} />
      <Correct />
      <Congrats />
    </div>
  );
};

export default Hint;
