import ContactForm from '@/components/ContactForm';
import { getDictionary } from '../dictionaries';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPhone, faEnvelope, faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons';

export default async function ContactUs({ params: { lang } }) {
  const dict = await getDictionary(lang);

  return (
    <section className="py-24 bg-white dark:bg-gray-800">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 grid-cols-1">
          <div className="lg:mb-0 mb-10">
            <div className="group w-full h-full relative">
              <div className="relative h-full">
                <img
                  src="https://assets.nflxext.com/ffe/siteui/vlv3/f272782d-cf96-4988-a675-6db2afd165e0/web/YE-ar-20241008-TRIFECTA-perspective_5dbe1579-b769-4bad-b956-47c6bac5ce0b_small.jpg"
                  alt="ContactUs"
                  className="w-full h-full lg:rounded-l-2xl rounded-2xl object-cover"
                />
                {/* Dark overlay */}
                <div className="absolute inset-0 bg-black opacity-50 rounded-2xl lg:rounded-l-2xl"></div>
                {/* Content over the image */}
                <h1 className="text-white text-4xl font-bold leading-10 absolute top-11 left-11 z-10">
                  {dict.contact.title}
                </h1>
                <div className="absolute bottom-0 w-full lg:p-11 p-5 z-10">
                  <div className="bg-white rounded-lg p-6 block">
                    {/* Phone */}
                    <a href={dict.contact.links.phoneLink} className="flex items-center mb-6 gap-4">
                      <FontAwesomeIcon icon={faPhone} className="text-black" width="20px" />
                      <h5 className="text-black text-base font-normal leading-6 ">
                        {dict.contact.contactDetails.phone}
                      </h5>
                    </a>
                    {/* Email */}
                    <a href={dict.contact.links.emailLink} className="flex items-center mb-6 gap-4">
                      <FontAwesomeIcon icon={faEnvelope} className="text-black" size="lg" width="20px"/>
                      <h5 className="text-black text-base font-normal leading-6">
                        {dict.contact.contactDetails.email}
                      </h5>
                    </a>
                    {/* Address */}
                    <a href="javascript:;" className="flex items-center gap-4">
                      <FontAwesomeIcon icon={faMapMarkerAlt} className="text-black" size="lg" width="20px" />
                      <h5 className="text-black text-base font-normal leading-6 ">
                        {dict.contact.contactDetails.address}
                      </h5>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form Section */}
          <div className="bg-gray-100 dark:bg-gray-900 p-5 lg:p-11 lg:rounded-r-2xl rounded-2xl">
            <h2 className="text-indigo-600 text-4xl font-semibold leading-10 mb-11">
              {dict.contact.sendMessage}
            </h2>
            <ContactForm dict={dict.contact.form} />
          </div>
        </div>
      </div>
    </section>
  );
}
