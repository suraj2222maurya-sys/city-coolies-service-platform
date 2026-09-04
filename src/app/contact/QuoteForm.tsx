"use client";

import {
  useState,
  type FormEvent,
  type ReactNode,
} from "react";

type QuoteFormState = {
  fullName: string;
  phone: string;
  email: string;
  service: string;
  details: string;
};

const INITIAL_FORM: QuoteFormState = {
  fullName: "",
  phone: "",
  email: "",
  service: "",
  details: "",
};

function PersonIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <circle
        cx="12"
        cy="8"
        r="3.2"
        stroke="currentColor"
        strokeWidth="1.7"
      />

      <path
        d="M6.5 19c.5-3.6 2.4-5.5 5.5-5.5s5 1.9 5.5 5.5"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
      />
    </svg>
  );
}

function PhoneIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M7.1 3.8 9.4 7c.4.6.3 1.3-.2 1.8L8 10c1.2 2.5 3.5 4.7 6 6l1.2-1.2c.5-.5 1.2-.6 1.8-.2l3.2 2.3c.7.5.9 1.4.5 2.1-.7 1.3-2.2 2-3.7 1.8C9.8 19.8 4.2 14.2 3.2 7c-.2-1.5.5-3 1.8-3.7.7-.4 1.6-.2 2.1.5Z"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function MailIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <rect
        x="3.5"
        y="5.5"
        width="17"
        height="13"
        rx="2.2"
        stroke="currentColor"
        strokeWidth="1.7"
      />

      <path
        d="m5 7 7 5 7-5"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function ServiceIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <circle
        cx="12"
        cy="12"
        r="7"
        stroke="currentColor"
        strokeWidth="1.7"
      />

      <path
        d="M12 8v8M8 12h8"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
      />
    </svg>
  );
}

function MessageIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M5 5h14v11H9l-4 3V5Z"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinejoin="round"
      />

      <path
        d="M8.5 9.5h7M8.5 12.5h4.8"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
      />
    </svg>
  );
}

function ArrowIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M5 12h13M14 8l4 4-4 4"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function FieldIcon({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <span className="cc-qf-icon">
      {children}
    </span>
  );
}

export default function QuoteForm() {
  const [form, setForm] =
    useState<QuoteFormState>(
      INITIAL_FORM,
    );

  const [submitting, setSubmitting] =
    useState(false);

  const [message, setMessage] =
    useState("");

  const [isError, setIsError] =
    useState(false);

  const update = (
    field: keyof QuoteFormState,
    value: string,
  ) => {
    setForm((current) => ({
      ...current,
      [field]: value,
    }));
  };

  const submit = async (
    event: FormEvent<HTMLFormElement>,
  ) => {
    event.preventDefault();

    setSubmitting(true);
    setMessage("");
    setIsError(false);

    try {
      const response =
        await fetch(
          "/api/quote-requests",
          {
            method: "POST",

            headers: {
              "Content-Type":
                "application/json",
            },

            body: JSON.stringify(
              form,
            ),
          },
        );

      const result =
        (await response.json()) as {
          success?: boolean;
          message?: string;
        };

      if (
        !response.ok ||
        !result.success
      ) {
        throw new Error(
          result.message ??
            "Enquiry could not be submitted.",
        );
      }

      setMessage(
        result.message ??
          "Your enquiry has been sent successfully.",
      );

      setForm(
        INITIAL_FORM,
      );
    } catch (error) {
      setIsError(true);

      setMessage(
        error instanceof Error
          ? error.message
          : "Enquiry could not be submitted.",
      );
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form
      onSubmit={submit}
      className="cc-qf"
    >

      <label className="cc-qf-field">
        <span className="cc-qf-label">
          Your Name
        </span>

        <div className="cc-qf-control">
          <FieldIcon>
            <PersonIcon />
          </FieldIcon>

          <input
            required
            autoComplete="name"
            value={form.fullName}
            onChange={(event) =>
              update(
                "fullName",
                event.target.value,
              )
            }
            placeholder="Your Name"
          />
        </div>
      </label>

      <label className="cc-qf-field">
        <span className="cc-qf-label">
          Phone Number
        </span>

        <div className="cc-qf-control">
          <FieldIcon>
            <PhoneIcon />
          </FieldIcon>

          <input
            required
            type="tel"
            inputMode="numeric"
            autoComplete="tel"
            value={form.phone}
            onChange={(event) =>
              update(
                "phone",
                event.target.value,
              )
            }
            placeholder="Phone Number"
          />
        </div>
      </label>

      <label className="cc-qf-field">
        <span className="cc-qf-label">
          Email Address
        </span>

        <div className="cc-qf-control">
          <FieldIcon>
            <MailIcon />
          </FieldIcon>

          <input
            required
            type="email"
            autoComplete="email"
            value={form.email}
            onChange={(event) =>
              update(
                "email",
                event.target.value,
              )
            }
            placeholder="Email Address"
          />
        </div>
      </label>

      <label className="cc-qf-field">
        <span className="cc-qf-label">
          Select Service
        </span>

        <div className="cc-qf-control">
          <FieldIcon>
            <ServiceIcon />
          </FieldIcon>

          <select
            required
            value={form.service}
            onChange={(event) =>
              update(
                "service",
                event.target.value,
              )
            }
          >
            <option value="">
              Select Service
            </option>

            <option value="Deep Cleaning">
              Deep Cleaning
            </option>

            <option value="Renovation">
              Renovation
            </option>

            <option value="Electrical Works">
              Electrical Works
            </option>

            <option value="Plumbing Works">
              Plumbing Works
            </option>

            <option value="Painting Services">
              Painting Services
            </option>

            <option value="Civil Construction & Maintenance">
              Civil Construction &amp; Maintenance
            </option>

            <option value="Appliance Repair">
              Appliance Repair
            </option>

            <option value="Carpentry & Interior Works">
              Carpentry &amp; Interior Works
            </option>

            <option value="Packers & Movers">
              Packers &amp; Movers
            </option>

            <option value="Pest Control">
              Pest Control
            </option>

            <option value="Spa & Salon Services">
              Spa &amp; Salon Services
            </option>

            <option value="Fabrication Works">
              Fabrication Works
            </option>

            <option value="Gardening & Landscaping">
              Gardening &amp; Landscaping
            </option>

            <option value="Property Maintenance">
              Property Maintenance
            </option>
          </select>
        </div>
      </label>

      <label className="cc-qf-field cc-qf-wide">
        <span className="cc-qf-label">
          Message / Requirement
        </span>

        <div className="cc-qf-control cc-qf-message">
          <FieldIcon>
            <MessageIcon />
          </FieldIcon>

          <textarea
            required
            rows={4}
            value={form.details}
            onChange={(event) =>
              update(
                "details",
                event.target.value,
              )
            }
            placeholder="Message / Requirement"
          />
        </div>
      </label>

      {message ? (
        <p
          role="status"
          className={
            isError
              ? "cc-qf-status cc-qf-status-error"
              : "cc-qf-status cc-qf-status-success"
          }
        >
          {message}
        </p>
      ) : null}

      <button
        type="submit"
        disabled={submitting}
        className="cc-qf-submit"
      >
        <span>
          {submitting
            ? "Sending Enquiry..."
            : "Submit Enquiry"}
        </span>

        <span>
          <ArrowIcon />
        </span>
      </button>

    </form>
  );
}