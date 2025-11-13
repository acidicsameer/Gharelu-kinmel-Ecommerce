import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import contactSchema from "../../schema/contactSchema";
import { useRef } from "react";
import emailjs from "@emailjs/browser";
import { toast } from "react-toastify";
import notificationsound from "/sound/removedSound.wav";
const ServiceId = import.meta.env.VITE_serviceid;
const TemplateID = import.meta.env.VITE_templateid;
const publicKey = import.meta.env.VITE_publickey;
const Contact = () => {
  const form = useRef();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(contactSchema),
  });

  const onSubmit = () => {
    emailjs
      .sendForm(ServiceId, TemplateID, form.current, {
        publicKey: publicKey,
      })
      .then(
        () => {
          console.log("SUCCESS!");
        },
        (error) => {
          console.log("FAILED...", error.text);
        }
      );
    reset();
    EmailSentNotification();
  };
  const EmailSentNotification = () => {
    toast("Message Sent  successfully", {
      position: "top-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      color: "light",
    });
    playSound();
  };

  function playSound() {
    const audio = new Audio(notificationsound);
    audio.play();
  }
  return (
    <section className="bg-white text-black" id="contact">
      <div className="max-w-7xl mx-auto px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 gap-12">
          {/* Left side - Contact Info */}
          <div className="pr-6">
            <h2 className="text-3xl font-bold text-black mb-4">Contact Info</h2>
            <p className="text-lg text-black mb-8">
              Feel free to reach out to me anytime. I'd love to connect and
              continue the conversation!
            </p>
            <ul className="space-y-6">
              {/* Address */}
              <li className="flex">
                <div className="flex h-10 w-10 items-center justify-center rounded bg-blue-900 text-white">
                  <img
                    src=" /src/assets/images/location.png"
                    className=" bg-white w-10 h-10"
                  />
                </div>
                <div className="ml-4">
                  <h3 className="text-lg font-medium text-black">
                    Our Address
                  </h3>
                  <p className="text-black">Dharan-8</p>
                  <p className="text-black">Purwanchal Back Gate</p>
                </div>
              </li>

              {/* Phone/Email */}
              <li className="flex">
                <div className="flex h-10 w-10 items-center justify-center rounded bg-blue-900 text-black">
                  <img
                    src=" /src/assets/images/phone.png"
                    className=" bg-white w-10 h-10"
                  />
                </div>
                <div className="ml-5">
                  <h3 className="text-lg font-medium text-black">Contact</h3>
                  <p className="text-black">Mobile: +977 9807409596</p>
                  <p className="text-black">Email: acidicsameer008@gmail.com</p>
                </div>
              </li>

              {/* Working Hours */}
              <li className="flex">
                <div className="flex h-10 w-10 items-center justify-center rounded bg-blue-900 text-white">
                  <img
                    src=" /src/assets/images/time.png"
                    className=" bg-white w-10 h-10"
                  />
                </div>
                <div className="ml-4">
                  <h3 className="text-lg font-medium text-gray-900 text-black">
                    Working Hours
                  </h3>
                  <p className="text-black">Mon - Fri: 08:00 - 17:00</p>
                  <p className="">Sat - Sun: 08:00 - 12:00</p>
                </div>
              </li>
            </ul>
          </div>

          {/* Right side - Contact Form */}
          <div className="bg-white text-gray-800 p-8 shadow-md rounded-xl max-w-xl mx-auto">
            <h2 className="text-3xl font-bold mb-6 text-center">
              Send Me a Message
            </h2>

            <form
              ref={form}
              onSubmit={handleSubmit(onSubmit)}
              className="space-y-5"
            >
              {/* Name Field */}
              <div>
                <label htmlFor="name" className="block mb-1 font-medium">
                  Name:
                </label>
                <input
                  id="name"
                  {...register("name")}
                  placeholder="Enter your name "
                  className="w-full border border-gray-300 rounded-md px-2 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                />
                {errors.name && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.name.message}
                  </p>
                )}
              </div>

              {/* Phone Number */}
              <div>
                <label htmlFor="number" className="block mb-1 font-medium">
                  Phone Number
                </label>
                <input
                  id="number"
                  {...register("number")}
                  placeholder="98********"
                  className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                />
                {errors.number && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.number.message}
                  </p>
                )}
              </div>

              {/* Message */}
              <div>
                <label htmlFor="message" className="block mb-1 font-medium">
                  Your Message
                </label>
                <textarea
                  id="message"
                  {...register("message")}
                  rows="5"
                  placeholder="Write your message..."
                  className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                ></textarea>
                {errors.message && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.message.message}
                  </p>
                )}
              </div>

              <button
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-md transition-colors duration-200"
              >
                Send Message
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
