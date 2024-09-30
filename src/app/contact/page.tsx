import ContactForm from "@/components/custom/ContactForm";

const Contact = () => {
  return (
    <div className="mx-3 mt-[150px] min-h-[70vh] flex items-center justify-center">
      <div className="lg:w-[700px]">
        <h1 className="text-2xl md:text-5xl">
          Love to hear from you,
          <br />
          Get in touch 👋
        </h1>
        <div className="mt-10">
          <ContactForm />
        </div>
      </div>
    </div>
  );
};

export default Contact;
