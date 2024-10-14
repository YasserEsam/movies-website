import ContactForm from '@/components/ContactForm';

const ContactUs = () => {
  return (
    <section className="py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 grid-cols-1">
          <div className="lg:mb-0 mb-10">
            <div className="group w-full h-full">
              <div className="relative h-full">
                <img
                  src="cover-image.jpg"
                  alt="ContactUs"
                  className="w-full h-full lg:rounded-l-2xl rounded-2xl object-cover"
                />
                <h1 className="text-white text-4xl font-bold leading-10 absolute top-11 left-11">
                  Contact us
                </h1>
              </div>
            </div>
          </div>

          <div className="bg-gray-50 p-5 lg:p-11 lg:rounded-r-2xl rounded-2xl">
            <h2 className="text-indigo-600 text-4xl font-semibold leading-10 mb-11">
              Send Us A Message
            </h2>
            <ContactForm />
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactUs;
