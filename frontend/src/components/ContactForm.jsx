import { useState } from "react";
import { ArrowUpRight, CheckCircle2, Send } from "lucide-react";
import { sendContact } from "../data/api";

const initialState = { name: "", email: "", message: "" };

export default function ContactForm({ email }) {
  const [form, setForm] = useState(initialState);
  const [status, setStatus] = useState({ type: "", text: "" });
  const [loading, setLoading] = useState(false);

  const update = (event) => {
    setForm({ ...form, [event.target.name]: event.target.value });
  };

  const submit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setStatus({ type: "", text: "" });

    try {
      const data = await sendContact(form);
      setStatus({ type: "success", text: data.message });
      setForm(initialState);
    } catch (error) {
      setStatus({ type: "error", text: error.message });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="contact-layout">
      <div className="contact-copy">
        <span className="eyebrow">LET'S CONNECT</span>
        <h2>Have an interesting data problem?</h2>
        <p>
          I’m actively exploring Data Science opportunities where analytics,
          machine learning, NLP and Generative AI can create measurable impact.
        </p>
        <a className="email-link" href={`mailto:${email}`}>
          {email} <ArrowUpRight size={16} />
        </a>
      </div>

      <form className="contact-form glass-card" onSubmit={submit}>
        <label>
          Name
          <input name="name" value={form.name} onChange={update} required placeholder="Your name" />
        </label>
        <label>
          Email
          <input type="email" name="email" value={form.email} onChange={update} required placeholder="you@company.com" />
        </label>
        <label>
          Message
          <textarea name="message" value={form.message} onChange={update} required minLength={10} rows="5" placeholder="Tell me about the opportunity or project..." />
        </label>
        <button className="primary-button" type="submit" disabled={loading}>
          {loading ? "Sending..." : <>Send message <Send size={16} /></>}
        </button>
        {status.text && (
          <div className={`form-status ${status.type}`}>
            <CheckCircle2 size={16} />
            {status.text}
          </div>
        )}
      </form>
    </div>
  );
}
