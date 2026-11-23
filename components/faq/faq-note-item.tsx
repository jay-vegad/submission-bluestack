"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { FaqNoteItem as FaqNoteItemType } from "./types";

interface FaqNoteItemProps {
  item: FaqNoteItemType;
  isOpen: boolean;
  onToggle: () => void;
}

export function FaqNoteItem({ item, isOpen, onToggle }: FaqNoteItemProps) {
  const answerId = item.answerId || `a-${item.id.replace(/^q-/, "")}`;
  const noteRef = useRef<HTMLLIElement>(null);
  const answerRef = useRef<HTMLDivElement>(null);
  const flapRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLParagraphElement>(null);
  const isFirstRender = useRef(true);
  const [isClosing, setIsClosing] = useState(false);

  useEffect(() => {
    const answerEl = answerRef.current;
    const textEl = textRef.current;
    if (!answerEl) return;

    if (isFirstRender.current) {
      isFirstRender.current = false;
      if (isOpen) {
        gsap.set(answerEl, { height: "auto", opacity: 1, display: "block" });
        if (textEl) gsap.set(textEl, { rotateX: 0, opacity: 1, y: 0 });
      } else {
        gsap.set(answerEl, { height: 0, opacity: 0, display: "none" });
        if (textEl) gsap.set(textEl, { rotateX: -75, opacity: 0, y: -4, transformOrigin: "50% 0%" });
      }
      return;
    }

    gsap.killTweensOf([answerEl, textEl]);

    if (isOpen) {
      // 1. Smoothly reveal answer container & animate height
      gsap.set(answerEl, { display: "block", overflow: "hidden" });
      gsap.fromTo(
        answerEl,
        { height: 0, opacity: 1 },
        {
          height: "auto",
          opacity: 1,
          duration: 0.38,
          ease: "power2.out",
          onComplete: () => {
            gsap.set(answerEl, { clearProps: "overflow" });
          },
        }
      );

      // 2. Animate text coming in using CSS 3D transform properties (rotateX, opacity, transformOrigin) via GSAP
      if (textEl) {
        gsap.fromTo(
          textEl,
          {
            rotateX: -75,
            opacity: 0,
            y: -4,
            transformOrigin: "50% 0%",
          },
          {
            rotateX: 0,
            opacity: 1,
            y: 0,
            duration: 0.42,
            delay: 0.05,
            ease: "power2.out",
          }
        );
      }
    } else {
      // Closing animation with simple smooth fade and collapse (no bounce)
      setIsClosing(true);
      const currentHeight = answerEl.offsetHeight;

      gsap.set(answerEl, { overflow: "hidden" });

      // 1. Fold text back using 3D rotateX and opacity
      if (textEl) {
        gsap.to(textEl, {
          rotateX: -65,
          opacity: 0,
          y: -4,
          duration: 0.22,
          ease: "power2.in",
          transformOrigin: "50% 0%",
        });
      }

      // 2. Smooth height collapse
      gsap.fromTo(
        answerEl,
        { height: currentHeight, opacity: 1 },
        {
          height: 0,
          opacity: 0,
          duration: 0.28,
          ease: "power2.inOut",
          onComplete: () => {
            gsap.set(answerEl, { display: "none" });
            setIsClosing(false);
          },
        }
      );
    }
  }, [isOpen]);

  return (
    <li
      ref={noteRef}
      className="tp-note"
      data-reveal="true"
      style={
        {
          "--tilt": item.tilt,
          "--pin": item.pinColor,
          "--i": item.index,
          rotate: isOpen ? "0deg" : item.tilt,
        } as React.CSSProperties
      }
      data-revealed="true"
      {...(isOpen
        ? { "data-unfolded": "true", "data-open": "true" }
        : isClosing
        ? { "data-closing": "true" }
        : {})}
    >
      {/* 3D Round Pushpin in Top Center */}
      <span aria-hidden="true" className="tp-note__pin" />

      {/* Accordion Question Header */}
      <h2 className="tp-note__q m-0 p-0">
        <button
          type="button"
          id={item.id}
          aria-expanded={isOpen}
          aria-controls={answerId}
          onClick={onToggle}
          style={{ color: "#2a170e" }}
        >
          <span
            className="font-plush-text"
            style={{ color: "#2a170e", flex: 1 }}
          >
            {item.question}
          </span>

          {/* Pure CSS rotating chevron (translated to upside) */}
          <span aria-hidden="true" className="tp-note__chevron" />
        </button>
      </h2>

      {/* Smooth Expandable Answer Flap with Dotted / Dashed Divider animated via GSAP */}
      <div
        ref={answerRef}
        id={answerId}
        role="region"
        aria-labelledby={item.id}
        className="tp-note__answer"
        inert={!isOpen}
      >
        <div ref={flapRef} className="tp-note__flap">
          <p ref={textRef}>{item.answer}</p>
        </div>
      </div>
    </li>
  );
}
