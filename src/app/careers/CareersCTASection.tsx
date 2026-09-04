"use client";

import {
  ChangeEvent,
  FormEvent,
  useEffect,
  useRef,
  useState,
} from "react";

type FormState = {
  fullName: string;
  phone: string;
  email: string;
  location: string;
  role: string;
  experience: string;
  skills: string;
  occupation: string;
  expectedSalary: string;
  message: string;
};

const initialForm: FormState = {
  fullName: "",
  phone: "",
  email: "",
  location: "",
  role: "",
  experience: "",
  skills: "",
  occupation: "",
  expectedSalary: "",
  message: "",
};

export default function CareersCTASection() {
  const sectionRef =
    useRef<HTMLElement | null>(
      null,
    );

  const [form, setForm] =
    useState<FormState>(
      initialForm,
    );

  const [resume, setResume] =
    useState<File | null>(
      null,
    );

  const [status, setStatus] =
    useState<
      "idle" |
      "sending" |
      "success" |
      "error"
    >("idle");

  const [message, setMessage] =
    useState("");

  useEffect(() => {
    const section =
      sectionRef.current;

    if (!section) {
      return;
    }

    const observer =
      new IntersectionObserver(
        ([entry]) => {
          if (!entry) {
            return;
          }

          if (
            entry.isIntersecting
          ) {
            section.classList.remove(
              "cc-cta-active",
            );

            window.requestAnimationFrame(
              () => {
                window.requestAnimationFrame(
                  () => {
                    section.classList.add(
                      "cc-cta-active",
                    );
                  },
                );
              },
            );
          } else {
            section.classList.remove(
              "cc-cta-active",
            );
          }
        },
        {
          threshold: 0.10,
        },
      );

    observer.observe(section);

    return () => {
      observer.disconnect();
    };
  }, []);

  const updateField = (
    event:
      ChangeEvent<
        HTMLInputElement |
        HTMLTextAreaElement |
        HTMLSelectElement
      >,
  ) => {
    const {
      name,
      value,
    } = event.target;

    setForm(
      (current) => ({
        ...current,
        [name]: value,
      }),
    );
  };

  const submitApplication =
    async (
      event:
        FormEvent<HTMLFormElement>,
    ) => {
      event.preventDefault();

      if (
        status === "sending"
      ) {
        return;
      }

      if (
        !resume
      ) {
        setStatus("error");
        setMessage(
          "Please attach your resume or CV.",
        );

        return;
      }

      if (
        resume.size >
        5 * 1024 * 1024
      ) {
        setStatus("error");
        setMessage(
          "Resume file must be 5 MB or smaller.",
        );

        return;
      }

      const allowed =
        [
          "application/pdf",
          "application/msword",
          "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
        ];

      if (
        !allowed.includes(
          resume.type,
        )
      ) {
        setStatus("error");
        setMessage(
          "Please upload a PDF, DOC or DOCX resume.",
        );

        return;
      }

      setStatus("sending");
      setMessage("");

      try {
        const body =
          new FormData();

        Object.entries(
          form,
        ).forEach(
          ([key, value]) => {
            body.append(
              key,
              value,
            );
          },
        );

        body.append(
          "resume",
          resume,
        );

        const response =
          await fetch(
            "/api/careers/apply",
            {
              method: "POST",
              body,
            },
          );

        const data =
          (await response.json()) as {
            message?: string;
          };

        if (
          !response.ok
        ) {
          throw new Error(
            data.message ||
              "Application could not be submitted.",
          );
        }

        setStatus("success");

        setMessage(
          "Application submitted successfully. Our team will review your profile.",
        );

        setForm(
          initialForm,
        );

        setResume(null);

        const input =
          document.getElementById(
            "cc-career-resume",
          ) as HTMLInputElement | null;

        if (input) {
          input.value = "";
        }
      } catch (error) {
        setStatus("error");

        setMessage(
          error instanceof Error
            ? error.message
            : "Application could not be submitted.",
        );
      }
    };

  return (
    <section
      ref={sectionRef}
      id="join-city-coolies"
      className="cc-career-cta"
      aria-labelledby="join-city-coolies-heading"
    >
      <div
        className="cc-cta-orb cc-cta-orb-one"
        aria-hidden="true"
      />

      <div
        className="cc-cta-orb cc-cta-orb-two"
        aria-hidden="true"
      />

      <div className="cc-cta-shell">
        <div className="cc-cta-copy">
          <div className="cc-cta-kicker">
            <i />

            <span>
              Join City Coolies
            </span>
          </div>

          <h2 id="join-city-coolies-heading">
            <span>
              Your next chapter
            </span>

            <span>
              could <em>start here.</em>
            </span>
          </h2>

          <p>
            Tell us about your skills,
            experience and the kind of work
            you want to do. Share your profile
            with City Coolies and let our team
            understand where you could create
            the strongest impact.
          </p>

          <div className="cc-cta-trust">
            <div>
              <span>01</span>

              <strong>
                Your profile stays professional
              </strong>

              <p>
                Applications are shared directly
                with the City Coolies team.
              </p>
            </div>

            <div>
              <span>02</span>

              <strong>
                Apply for the right opportunity
              </strong>

              <p>
                Tell us the role or career track
                that best matches your strengths.
              </p>
            </div>

            <div>
              <span>03</span>

              <strong>
                Resume included
              </strong>

              <p>
                Upload your CV so the team can
                review your experience properly.
              </p>
            </div>
          </div>

          <div className="cc-cta-contact">
            <span>
              Careers inbox
            </span>

            <strong>
              citycooliescrm@gmail.com
            </strong>
          </div>
        </div>

        <div className="cc-cta-form-wrap">
          <div
            className="cc-cta-form-light"
            aria-hidden="true"
          />

          <form
            className="cc-cta-form"
            onSubmit={
              submitApplication
            }
          >
            <div className="cc-form-head">
              <div>
                <span>
                  Career Application
                </span>

                <h3>
                  Join Our Team
                </h3>
              </div>

              <i>
                ↗
              </i>
            </div>

            <div className="cc-form-grid">
              <label>
                <span>
                  Full Name *
                </span>

                <input
                  name="fullName"
                  type="text"
                  required
                  autoComplete="name"
                  value={
                    form.fullName
                  }
                  onChange={
                    updateField
                  }
                  placeholder="Your full name"
                />
              </label>

              <label>
                <span>
                  Mobile Number *
                </span>

                <input
                  name="phone"
                  type="tel"
                  required
                  autoComplete="tel"
                  value={
                    form.phone
                  }
                  onChange={
                    updateField
                  }
                  placeholder="+91"
                />
              </label>

              <label>
                <span>
                  Email Address *
                </span>

                <input
                  name="email"
                  type="email"
                  required
                  autoComplete="email"
                  value={
                    form.email
                  }
                  onChange={
                    updateField
                  }
                  placeholder="name@example.com"
                />
              </label>

              <label>
                <span>
                  City / Location *
                </span>

                <input
                  name="location"
                  type="text"
                  required
                  value={
                    form.location
                  }
                  onChange={
                    updateField
                  }
                  placeholder="Your current city"
                />
              </label>

              <label className="cc-field-wide">
                <span>
                  Role / Career Track *
                </span>

                <select
                  name="role"
                  required
                  value={
                    form.role
                  }
                  onChange={
                    updateField
                  }
                >
                  <option value="">
                    Select a career track
                  </option>

                  <option>
                    Operations & Service Delivery
                  </option>

                  <option>
                    Customer Experience
                  </option>

                  <option>
                    Sales & Partnerships
                  </option>

                  <option>
                    Vendor & Professional Network
                  </option>

                  <option>
                    Technology & Product
                  </option>

                  <option>
                    Marketing & Growth
                  </option>

                  <option>
                    Finance & Administration
                  </option>

                  <option>
                    Field Operations
                  </option>

                  <option>
                    Other / General Application
                  </option>
                </select>
              </label>

              <label>
                <span>
                  Work Experience *
                </span>

                <input
                  name="experience"
                  type="text"
                  required
                  value={
                    form.experience
                  }
                  onChange={
                    updateField
                  }
                  placeholder="Example: 3 years"
                />
              </label>

              <label>
                <span>
                  Current Occupation
                </span>

                <input
                  name="occupation"
                  type="text"
                  value={
                    form.occupation
                  }
                  onChange={
                    updateField
                  }
                  placeholder="Current role"
                />
              </label>

              <label className="cc-field-wide">
                <span>
                  Skills / Expertise *
                </span>

                <input
                  name="skills"
                  type="text"
                  required
                  value={
                    form.skills
                  }
                  onChange={
                    updateField
                  }
                  placeholder="Your key skills and expertise"
                />
              </label>

              <label className="cc-field-wide">
                <span>
                  Expected Salary
                </span>

                <input
                  name="expectedSalary"
                  type="text"
                  value={
                    form.expectedSalary
                  }
                  onChange={
                    updateField
                  }
                  placeholder="Optional"
                />
              </label>

              <label className="cc-field-wide">
                <span>
                  Tell Us About Yourself *
                </span>

                <textarea
                  name="message"
                  required
                  rows={4}
                  value={
                    form.message
                  }
                  onChange={
                    updateField
                  }
                  placeholder="Tell us about your experience, strengths and the work you want to do."
                />
              </label>

              <label className="cc-field-wide cc-resume-field">
                <span>
                  Resume / CV *
                </span>

                <input
                  id="cc-career-resume"
                  type="file"
                  required
                  accept=".pdf,.doc,.docx"
                  onChange={(
                    event,
                  ) => {
                    setResume(
                      event
                        .target
                        .files?.[0] ||
                        null,
                    );
                  }}
                />

                <small>
                  PDF, DOC or DOCX · Maximum 5 MB
                </small>
              </label>
            </div>

            <label className="cc-form-consent">
              <input
                type="checkbox"
                required
              />

              <span>
                I confirm that the information
                provided is accurate and I agree
                that City Coolies may use these
                details to review my career
                application.
              </span>
            </label>

            <button
              type="submit"
              disabled={
                status ===
                "sending"
              }
            >
              <span>
                {status ===
                "sending"
                  ? "Submitting Application..."
                  : "Submit Application"}
              </span>

              <i>
                →
              </i>
            </button>

            {message ? (
              <div
                role="status"
                className={`cc-form-message ${
                  status ===
                  "success"
                    ? "is-success"
                    : "is-error"
                }`}
              >
                {message}
              </div>
            ) : null}

            <p className="cc-form-note">
              Your application is sent securely
              to the City Coolies careers inbox.
            </p>
          </form>
        </div>
      </div>

      <style>{`
        .cc-career-cta {
          --cc-red: #f02030;
          --cc-dark-red: #d7091c;
          --cc-ink: #191a20;
          --cc-muted: #6b6e77;

          position: relative;
          isolation: isolate;

          width: 100%;

          overflow: hidden;

          color:
            var(--cc-ink);

          background:
            radial-gradient(
              circle at 82% 16%,
              rgba(
                255,
                179,
                193,
                .30
              ),
              rgba(
                255,
                225,
                231,
                .10
              )
              31%,
              transparent 55%
            ),
            linear-gradient(
              120deg,
              #ffffff,
              #fff8fa 48%,
              #ffeef2
            );
        }

        .cc-cta-orb {
          position: absolute;

          border-radius: 50%;

          pointer-events: none;

          filter: blur(3px);
        }

        .cc-cta-orb-one {
          top: -170px;
          right: -90px;

          width: 420px;
          height: 420px;

          background:
            radial-gradient(
              circle,
              rgba(
                240,
                32,
                48,
                .15
              ),
              transparent 70%
            );

          animation:
            ccCTAOrbOne
            7s
            ease-in-out
            infinite
            alternate;
        }

        .cc-cta-orb-two {
          bottom: -220px;
          left: -120px;

          width: 390px;
          height: 390px;

          background:
            radial-gradient(
              circle,
              rgba(
                255,
                169,
                184,
                .20
              ),
              transparent 70%
            );

          animation:
            ccCTAOrbTwo
            8s
            ease-in-out
            infinite
            alternate;
        }

        .cc-cta-shell {
          display: grid;

          grid-template-columns:
            minmax(
              0,
              .85fr
            )
            minmax(
              520px,
              1.15fr
            );

          gap:
            clamp(
              50px,
              6vw,
              95px
            );

          width:
            min(
              calc(
                100% - 72px
              ),
              1480px
            );

          margin: 0 auto;

          padding:
            clamp(
              75px,
              7vw,
              108px
            )
            0;
        }

        .cc-cta-copy {
          align-self: center;

          padding:
            20px
            0;
        }

        .cc-cta-kicker {
          display: inline-flex;
          align-items: center;

          gap: 10px;

          opacity: 0;

          color:
            var(--cc-red);

          transform:
            translateX(-24px);
        }

        .cc-cta-active
        .cc-cta-kicker {
          animation:
            ccCTARevealLeft
            .7s
            cubic-bezier(.16,1,.3,1)
            .08s
            forwards;
        }

        .cc-cta-kicker i {
          width: 31px;
          height: 2px;

          background:
            var(--cc-red);
        }

        .cc-cta-kicker span {
          font-size: 10px;
          font-weight: 900;

          letter-spacing:
            .17em;

          text-transform:
            uppercase;
        }

        .cc-cta-copy h2 {
          margin:
            25px
            0
            0;

          font-size:
            clamp(
              48px,
              5.8vw,
              82px
            );

          font-weight: 740;

          line-height: .95;

          letter-spacing:
            -.055em;
        }

        .cc-cta-copy h2 span {
          display: block;

          opacity: 0;

          filter: blur(9px);

          transform:
            translateY(48px);
        }

        .cc-cta-active
        .cc-cta-copy h2
        span:first-child {
          animation:
            ccCTATitle
            .82s
            cubic-bezier(.16,1,.3,1)
            .35s
            forwards;
        }

        .cc-cta-active
        .cc-cta-copy h2
        span:last-child {
          animation:
            ccCTATitle
            .82s
            cubic-bezier(.16,1,.3,1)
            .54s
            forwards;
        }

        .cc-cta-copy h2 em {
          color:
            var(--cc-red);

          font-style: normal;
        }

        .cc-cta-copy > p {
          max-width: 540px;

          margin:
            28px
            0
            0;

          opacity: 0;

          color:
            var(--cc-muted);

          font-size:
            clamp(
              14px,
              1.15vw,
              18px
            );

          line-height: 1.75;

          filter: blur(6px);

          transform:
            translateY(22px);
        }

        .cc-cta-active
        .cc-cta-copy > p {
          animation:
            ccCTACopy
            .78s
            cubic-bezier(.16,1,.3,1)
            .82s
            forwards;
        }

        .cc-cta-trust {
          margin-top: 42px;

          border-top:
            1px solid
            rgba(
              240,
              32,
              48,
              .11
            );
        }

        .cc-cta-trust > div {
          display: grid;

          grid-template-columns:
            42px
            1fr;

          gap:
            3px
            14px;

          padding:
            18px
            0;

          opacity: 0;

          border-bottom:
            1px solid
            rgba(
              240,
              32,
              48,
              .10
            );

          transform:
            translateX(-20px);
        }

        .cc-cta-active
        .cc-cta-trust > div:nth-child(1) {
          animation:
            ccCTARevealLeft
            .65s
            cubic-bezier(.16,1,.3,1)
            1.05s
            forwards;
        }

        .cc-cta-active
        .cc-cta-trust > div:nth-child(2) {
          animation:
            ccCTARevealLeft
            .65s
            cubic-bezier(.16,1,.3,1)
            1.18s
            forwards;
        }

        .cc-cta-active
        .cc-cta-trust > div:nth-child(3) {
          animation:
            ccCTARevealLeft
            .65s
            cubic-bezier(.16,1,.3,1)
            1.31s
            forwards;
        }

        .cc-cta-trust span {
          grid-row:
            1 / 3;

          color:
            rgba(
              240,
              32,
              48,
              .34
            );

          font-size: 17px;
          font-weight: 900;
        }

        .cc-cta-trust strong {
          font-size: 13px;
          font-weight: 800;
        }

        .cc-cta-trust p {
          margin: 0;

          color:
            var(--cc-muted);

          font-size: 11.5px;

          line-height: 1.55;
        }

        .cc-cta-contact {
          display: flex;
          flex-direction: column;

          gap: 3px;

          margin-top: 28px;

          opacity: 0;
        }

        .cc-cta-active
        .cc-cta-contact {
          animation:
            ccCTACopy
            .7s
            ease
            1.5s
            forwards;
        }

        .cc-cta-contact span {
          color:
            var(--cc-muted);

          font-size: 9px;
          font-weight: 850;

          letter-spacing:
            .14em;

          text-transform:
            uppercase;
        }

        .cc-cta-contact strong {
          font-size: 14px;
        }

        /*
         * FORM
         */

        .cc-cta-form-wrap {
          position: relative;

          opacity: 0;

          transform:
            perspective(1200px)
            rotateY(-7deg)
            translateX(55px)
            scale(.96);
        }

        .cc-cta-active
        .cc-cta-form-wrap {
          animation:
            ccCTAFormEnter
            1s
            cubic-bezier(.16,1,.3,1)
            .65s
            forwards;
        }

        .cc-cta-form-light {
          position: absolute;

          inset:
            auto
            10%
            -35px;

          height: 80px;

          border-radius: 50%;

          background:
            radial-gradient(
              ellipse,
              rgba(
                255,
                255,
                255,
                .94
              ),
              rgba(
                255,
                106,
                124,
                .31
              )
              42%,
              transparent 72%
            );

          filter: blur(9px);

          animation:
            ccCTAFormLight
            2.8s
            ease-in-out
            infinite
            alternate;
        }

        .cc-cta-form {
          position: relative;

          padding:
            clamp(
              25px,
              3vw,
              42px
            );

          overflow: hidden;

          border:
            1px solid
            rgba(
              240,
              32,
              48,
              .14
            );

          border-radius:
            30px;

          background:
            rgba(
              255,
              255,
              255,
              .76
            );

          box-shadow:
            0
            30px
            80px
            rgba(
              122,
              10,
              24,
              .10
            ),
            inset
            0
            1px
            0
            rgba(
              255,
              255,
              255,
              .95
            );

          backdrop-filter:
            blur(22px);
        }

        .cc-cta-form::before {
          position: absolute;

          top: -45%;
          left: -20%;

          width: 25%;
          height: 190%;

          content: "";

          pointer-events: none;

          opacity: .45;

          background:
            linear-gradient(
              90deg,
              transparent,
              rgba(
                255,
                255,
                255,
                .88
              ),
              transparent
            );

          filter: blur(8px);

          transform:
            rotate(22deg);

          animation:
            ccCTAFormShine
            6s
            ease-in-out
            infinite;
        }

        .cc-form-head {
          position: relative;
          z-index: 2;

          display: flex;
          align-items: center;
          justify-content: space-between;

          gap: 20px;

          margin-bottom: 27px;
        }

        .cc-form-head span {
          color:
            var(--cc-red);

          font-size: 9px;
          font-weight: 900;

          letter-spacing:
            .15em;

          text-transform:
            uppercase;
        }

        .cc-form-head h3 {
          margin:
            5px
            0
            0;

          font-size:
            clamp(
              27px,
              2.4vw,
              36px
            );

          font-weight: 760;

          letter-spacing:
            -.035em;
        }

        .cc-form-head i {
          display: grid;

          width: 48px;
          height: 48px;

          place-items: center;

          border-radius: 50%;

          color: white;

          font-size: 21px;
          font-style: normal;

          background:
            linear-gradient(
              145deg,
              #ff3244,
              #d9071b
            );

          box-shadow:
            0
            15px
            32px
            rgba(
              212,
              7,
              28,
              .22
            );

          animation:
            ccCTAArrowFloat
            3s
            ease-in-out
            infinite
            alternate;
        }

        .cc-form-grid {
          position: relative;
          z-index: 2;

          display: grid;

          grid-template-columns:
            repeat(
              2,
              minmax(
                0,
                1fr
              )
            );

          gap: 19px 16px;
        }

        .cc-form-grid label {
          display: flex;
          flex-direction: column;

          gap: 8px;
        }

        .cc-form-grid label > span {
          color:
            #464850;

          font-size: 10px;
          font-weight: 800;
        }

        .cc-form-grid input,
        .cc-form-grid select,
        .cc-form-grid textarea {
          width: 100%;

          border:
            1px solid
            rgba(
              35,
              36,
              42,
              .10
            );

          border-radius:
            13px;

          outline: none;

          color:
            #24252b;

          background:
            rgba(
              255,
              255,
              255,
              .76
            );

          transition:
            border-color .25s ease,
            box-shadow .25s ease,
            transform .25s ease,
            background .25s ease;
        }

        .cc-form-grid input,
        .cc-form-grid select {
          min-height: 48px;

          padding:
            0
            14px;
        }

        .cc-form-grid textarea {
          min-height: 105px;

          padding: 13px 14px;

          resize: vertical;
        }

        .cc-form-grid input:focus,
        .cc-form-grid select:focus,
        .cc-form-grid textarea:focus {
          border-color:
            rgba(
              240,
              32,
              48,
              .46
            );

          background:
            white;

          box-shadow:
            0
            0
            0
            4px
            rgba(
              240,
              32,
              48,
              .07
            );

          transform:
            translateY(-1px);
        }

        .cc-field-wide {
          grid-column:
            1 / -1;
        }

        .cc-resume-field {
          padding:
            15px;

          border:
            1px dashed
            rgba(
              240,
              32,
              48,
              .30
            );

          border-radius:
            15px;

          background:
            rgba(
              255,
              241,
              244,
              .40
            );
        }

        .cc-resume-field input {
          min-height: 0;

          padding: 0;

          border: 0;

          background:
            transparent;
        }

        .cc-resume-field small {
          color:
            var(--cc-muted);

          font-size: 9.5px;
        }

        .cc-form-consent {
          position: relative;
          z-index: 2;

          display: flex;
          align-items: flex-start;

          gap: 10px;

          margin-top: 20px;

          color:
            var(--cc-muted);

          font-size: 10px;

          line-height: 1.55;
        }

        .cc-form-consent input {
          margin-top: 3px;

          accent-color:
            var(--cc-red);
        }

        .cc-cta-form > button {
          position: relative;
          z-index: 2;

          display: flex;
          align-items: center;
          justify-content: space-between;

          width: 100%;
          min-height: 55px;

          margin-top: 22px;

          padding:
            0
            18px
            0
            21px;

          border: 0;

          border-radius: 14px;

          color: white;

          cursor: pointer;

          background:
            linear-gradient(
              100deg,
              #f02030,
              #df071c
            );

          box-shadow:
            0
            18px
            35px
            rgba(
              221,
              7,
              29,
              .20
            );

          transition:
            transform .25s ease,
            box-shadow .25s ease;
        }

        .cc-cta-form > button:hover {
          transform:
            translateY(-2px);

          box-shadow:
            0
            23px
            42px
            rgba(
              221,
              7,
              29,
              .27
            );
        }

        .cc-cta-form > button:disabled {
          cursor: wait;

          opacity: .65;
        }

        .cc-cta-form > button span {
          font-size: 12px;
          font-weight: 850;
        }

        .cc-cta-form > button i {
          display: grid;

          width: 34px;
          height: 34px;

          place-items: center;

          border-radius: 50%;

          color:
            var(--cc-red);

          font-size: 17px;
          font-style: normal;

          background: white;
        }

        .cc-form-message {
          position: relative;
          z-index: 2;

          margin-top: 15px;

          padding: 12px 14px;

          border-radius: 11px;

          font-size: 11px;
          font-weight: 700;
        }

        .cc-form-message.is-success {
          color: #13753d;

          background:
            rgba(
              20,
              170,
              86,
              .08
            );
        }

        .cc-form-message.is-error {
          color:
            #c6091b;

          background:
            rgba(
              240,
              32,
              48,
              .08
            );
        }

        .cc-form-note {
          position: relative;
          z-index: 2;

          margin:
            13px
            0
            0;

          color:
            #858790;

          font-size: 9px;

          text-align: center;
        }

        @keyframes ccCTARevealLeft {
          to {
            opacity: 1;

            transform:
              translateX(0);
          }
        }

        @keyframes ccCTATitle {
          to {
            opacity: 1;

            filter: blur(0);

            transform:
              translateY(0);
          }
        }

        @keyframes ccCTACopy {
          to {
            opacity: 1;

            filter: blur(0);

            transform:
              translateY(0);
          }
        }

        @keyframes ccCTAFormEnter {
          to {
            opacity: 1;

            transform:
              perspective(1200px)
              rotateY(0deg)
              translateX(0)
              scale(1);
          }
        }

        @keyframes ccCTAOrbOne {
          to {
            transform:
              translate(
                -40px,
                35px
              )
              scale(1.08);
          }
        }

        @keyframes ccCTAOrbTwo {
          to {
            transform:
              translate(
                38px,
                -27px
              )
              scale(1.06);
          }
        }

        @keyframes ccCTAFormLight {
          to {
            opacity: .55;

            transform:
              scale(1.10);
          }
        }

        @keyframes ccCTAFormShine {
          0% {
            left: -20%;

            opacity: 0;
          }

          18% {
            opacity: .55;
          }

          50%,
          100% {
            left: 125%;

            opacity: 0;
          }
        }

        @keyframes ccCTAArrowFloat {
          to {
            transform:
              translateY(-5px)
              rotate(8deg);
          }
        }

        @media (
          max-width: 1020px
        ) {
          .cc-cta-shell {
            grid-template-columns:
              1fr;

            max-width: 900px;
          }

          .cc-cta-copy {
            max-width: 720px;
          }
        }

        @media (
          max-width: 620px
        ) {
          .cc-cta-shell {
            width:
              calc(
                100% -
                32px
              );

            gap: 40px;

            padding:
              60px
              0;
          }

          .cc-cta-copy h2 {
            font-size:
              clamp(
                42px,
                12vw,
                58px
              );
          }

          .cc-form-grid {
            grid-template-columns:
              1fr;
          }

          .cc-field-wide {
            grid-column: auto;
          }

          .cc-cta-form {
            padding:
              23px
              17px;

            border-radius:
              23px;
          }

          .cc-cta-trust > div {
            grid-template-columns:
              35px
              1fr;
          }
        }

        @media (
          prefers-reduced-motion:
          reduce
        ) {
          .cc-cta-kicker,
          .cc-cta-copy h2 span,
          .cc-cta-copy > p,
          .cc-cta-trust > div,
          .cc-cta-contact,
          .cc-cta-form-wrap {
            opacity: 1 !important;

            filter: none !important;

            transform:
              none !important;

            animation:
              none !important;
          }

          .cc-cta-orb,
          .cc-cta-form-light,
          .cc-cta-form::before,
          .cc-form-head i {
            animation:
              none !important;
          }
        }
      `}</style>
    </section>
  );
}