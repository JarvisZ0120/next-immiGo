// home page file
"use client";

import { useState, useEffect } from "react";
import { CalendarDaysIcon, HandRaisedIcon } from "@heroicons/react/24/outline";
import Header from "/src/app/components/Header"; // 导入 Header 组件
import Footer from "/src/app/components/Footer"; // 导入 Footer 组件

const stats = [
  { name: "Update", value: "REAL-TIME" },
  { name: "Visualization", value: "DATA" },
  { name: "Tracking", value: "PERSONALIZED" },
  { name: "Service", value: "FREE" },
];

const translations = {
  en: {
    description:
      "Real-time tracker for Canada's Express Entry immigration system",
    aboutContent:
      "ImmiGo is a platform dedicated to providing information on Canadian immigration, helping users understand the immigration process and the latest updates.",
    latestDraw: "Latest Draw",
    minimumScore: "Minimum Score:",
    numberOfInvitations: "Number of Invitations:",
    getStarted: "Get started",
    learnMore: "Learn more",
    date: "Date:",
    subscribe: "Subscribe for Updates",
    subscribeContent:
      "We will provide immediate updates whenever a new draw is made from the EE System.",
    subscribeButton: "Subscribe",
    enterEmail: "Enter your email",
    programName: "Program Name:",
    enterYourName: "Enter your name",
    selectProgramsToFollow: "Select Programs to Follow:",
    areYouCurrentlyInThePool: "Are you currently in the pool?",
    enterYourScore: "Enter Your Score:",
    selectYourCurrentProgram: "Select Your Current Program:",
    instantNotification: "Instant notification",
    instantNotificationMsg:
      "Get instant updates and never miss out on important news—delivered straight to your inbox!",
    noSpam: "No spam",
    noSpamMsg:
      "Promise not to send any spam, and your information will be kept secure and confidential.",
  },
  fr: {
    description:
      "Outil de suivi en temps réel pour le système d'immigration Express Entry du Canada",
    aboutContent:
      "ImmiGo est une plateforme dédiée à fournir des informations sur l'immigration canadienne, aidant les utilisateurs à comprendre le processus d'immigration et les dernières mises à jour.",
    latestDraw: "Dernier Tirage",
    minimumScore: "Score Minimum:",
    numberOfInvitations: "Nombre d'Invitations:",
    getStarted: "Commencer",
    learnMore: "En savoir plus",
    date: "Date:",
    subscribe: "S'abonner aux mises à jour",
    subscribeContent:
      "Nous fournirons des mises à jour immédiates dès qu'un nouveau tirage sera effectué depuis le système EE.",
    subscribeButton: "S'abonner",
    enterEmail: "Entrez votre email",
    programName: "Nom du programme:",
    enterYourName: "Entrez votre nom",
    selectProgramsToFollow: "Sélectionnez les programmes à suivre:",
    areYouCurrentlyInThePool: "Êtes-vous actuellement dans le bassin?",
    enterYourScore: "Entrez votre score:",
    selectYourCurrentProgram: "Sélectionnez votre programme actuel:",
    instantNotification: "Notification instantanée",
    instantNotificationMsg:
      "Recevez des mises à jour instantanées et ne manquez jamais d'informations importantes—livrées directement dans votre boîte de réception!",
    noSpam: "Pas de spam",
    noSpamMsg:
      "Promesse de ne pas envoyer de spam, et vos informations seront gardées sécurisées et confidentielles.",
  },
  zh: {
    description: "加拿大快速通道移民系统的实时跟踪工具",
    aboutContent:
      "ImmiGo是一个致力于提供关加拿大移民信息的平台，帮助用户了解移民过程和最新动态。",
    latestDraw: "最新抽签",
    minimumScore: "最低分数:",
    numberOfInvitations: "邀请人数:",
    getStarted: "开始使用",
    learnMore: "了解更多",
    date: "日期:",
    subscribe: "订阅更新",
    subscribeContent: "每当EE系统有新的抽签时，我们将提供即时更新。",
    subscribeButton: "订阅",
    enterEmail: "输入您的电子邮件",
    programName: "项目名称:",
    enterYourName: "输入您的姓名",
    selectProgramsToFollow: "选择要关注的项目:",
    areYouCurrentlyInThePool: "您目前是否在池中?",
    enterYourScore: "输入您的分数:",
    selectYourCurrentProgram: "选择您的当前项目:",
    instantNotification: "即时通知",
    instantNotificationMsg:
      "获取即时更新，绝不错过重要消息—直接送到您的收件箱！",
    noSpam: "无垃圾邮件",
    noSpamMsg: "承诺不发送任何垃圾邮件，您的信息将被安全和保密地保存。",
  },
  hi: {
    description:
      "कनाडा के एक्सप्रेस एंट्री इमिग्रेशन सिस्टम के लिए वास्तविक समय ट्रैकिंग टूल",
    aboutContent:
      "ImmiGo एक ऐसा प्लेटफार्म है जो कनाडाई इमिग्रेशन पर जानकारी प्रदान करने के लिए समर्पित है, उपयोगकर्ताओं को इमिग्रेशन प्रक्रिया और नवीनतम अपडेट को समझने में मदद करता है।",
    latestDraw: "नवीनतम ड्रॉ",
    minimumScore: "न्यूनतम स्कोर:",
    numberOfInvitations: "आमंत्रणों की संख्या:",
    getStarted: "शुरू करें",
    learnMore: "और जानें",
    date: "तारीख:",
    subscribe: "अपडेट के लिए सब्सक्राइब करें",
    subscribeContent:
      "हम EE सिस्टम से एक नया ड्रॉ होने पर तुरंत अपडेट प्रदान करेंगे।",
    subscribeButton: "सब्सक्राइब करें",
    enterEmail: "अपना ईमेल दर्ज करें",
    programName: "कार्यक्रम का नाम:",
    enterYourName: "अपना नाम दर्ज करें",
    selectProgramsToFollow: "फॉलो करने के लिए कार्यक्रम चुनें:",
    areYouCurrentlyInThePool: "क्या आप वर्तमान में पूल में हैं?",
    enterYourScore: "अपना स्कोर दर्ज करें:",
    selectYourCurrentProgram: "अपना वर्तमान कार्यक्रम चुनें:",
    instantNotification: "तत्काल सूचना",
    instantNotificationMsg:
      "तत्काल अपडेट प्राप्त करें और महत्वपूर्ण समाचारों को कभी न चूकें—सीधे आपके इनबॉक्स में!",
    noSpam: "कोई स्पैम नहीं",
    noSpamMsg:
      "स्पैम न भेजने का वादा, और आपकी जानकारी सुरक्षित और गोपनीय रखी जाएगी।",
  },
};

const programs = [
  "Provincial Nominee Program",
  "Federal Skilled Worker",
  "Canadian Experience Class",
  "Federal Skilled Trades",
  "French language proficiency",
  "STEM occupations",
  "Education occupations",
  "Healthcare occupations",
  "Healthcare and social services occupations",
  "Agriculture and agri-food occupations",
  "Transport occupations",
  "Trade occupations",
  "No Program Specified",
];

const InfoCardForLatestDraw = ({ title, content }) => (
  <div className="bg-blue-50 p-8 rounded-lg shadow-md w-full lg:h-2/5 mx-auto text-center">
    <h3 className="text-2xl font-semibold mb-4 text-black">{title}</h3>
    <div className="space-y-2">{content}</div>
  </div>
);

export default function Home() {
  const [language, setLanguage] = useState("en"); // 默认语言为英语
  const [name, setName] = useState(""); // 新增姓名状态
  const [email, setEmail] = useState("");
  const [selectedPrograms, setSelectedPrograms] = useState([]);
  const [score, setScore] = useState("");
  const [currentProgram, setCurrentProgram] = useState("");
  const [inPool, setInPool] = useState(false); // 新增状态
  const [message, setMessage] = useState(""); // 新增消息状态
  const [showConfetti, setShowConfetti] = useState(false); // 控制撒花效果

  const [latestDraw, setLatestDraw] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://www.canada.ca/content/dam/ircc/documents/json/ee_rounds_123_en.json"
        );
        const data = await response.json();
        const rounds = data.rounds || [];

        // 假设你只想获取最新一轮的抽签数据
        const latestRound = rounds[0];
        const type = (latestRound.drawName || "No Program Specified")
          .replace(/\(Version (1|2)\)/g, "")
          .trim();

        setLatestDraw({
          drawName: type,
          drawCRS: latestRound.drawCRS,
          drawSize: latestRound.drawSize,
          drawDate: latestRound.drawDateFull,
        });
      } catch (error) {
        console.error("Error fetching draw data:", error);
      }
    };

    fetchData();
  }, []);

  const handleSubscribe = async (e) => {
    e.preventDefault();

    if (!email || !name) {
      setMessage("Please fill in all fields correctly.");
      return;
    }

    try {
      // 发送订阅请求到后端
      const response = await fetch("/api/subscribe", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          score,
          selectedPrograms,
          currentProgram,
        }),
      });
      console.log(response);

      const result = await response.json();
      console.log(result);
      if (result.success) {
        // 发送订阅确认邮件
        const responseSubscribeEmail = await fetch("/api/sendEmail", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email,
            subject: `Welcome to ImmiGo, ${name}`,
            message: `
                      <div style="font-family: Arial, sans-serif; text-align: center;">
                          <h2 style="color: #000;">Welcome to ImmiGo</h2>
                          <p>Congratulations! You've subscribed to ImmiGo, the free service that helps you track Canadian Express Entry updates.</p>
                          <p>Here's what you'll get:</p>
                          <ul style="text-align: left; max-width: 600px; margin: 0 auto;">
                              <li><strong><u>Instant notifications for new Express Entry draws.</u></strong> You'll receive an email from us as soon as a new draw in <strong>${selectedPrograms.join(
                                ", "
                              )}</strong> is announced.</li>
                              ${
                                inPool
                                  ? `<li><strong><u>Quick congratulatory message.</u></strong> You will receive a congratulatory message from us once your score <strong>${score}</strong> in <strong>${currentProgram}</strong> exceeds the new draw's lowest score.</li>`
                                  : ""
                              }
                              <li><strong><u>Interactive dashboard to explore all historical data.</u></strong> We've compiled and cleaned Express Entry data to create a comprehensive dashboard for your use. Feel free to explore it at any time.</li>
                          </ul>
                          <a href="https://immigoo.com/dashboard" style="display: inline-block; margin-top: 20px; padding: 10px 20px; background-color: #007BFF; color: #fff; text-decoration: none; border-radius: 5px;">Explore Historical Data</a>
                          <p style="font-family: Arial, sans-serif; color: #333; font-size: 16px;">
                            Opt out of receiving further emails by clicking on the following
                            <a href="https://immigoo.com/unsubscribe" onclick="event.preventDefault(); handleUnsubscribe('${email}');" style="color: #007BFF; text-decoration: underline;">Unsubscribe</a> link.
                          </p>
                          <p>ImmiGo, Vancouver, BC, Canada</p>
                      </div>
                      `,
          }),
        });

        const resultSubscribeEmail = await responseSubscribeEmail.json();

        if (resultSubscribeEmail.success) {
          // TODO: There is a Confetti issue needs to be fixed
          setShowConfetti(true); // 显示撒花效果
          setTimeout(() => {
            setShowConfetti(false); // 几秒后隐藏撒花效果
          }, 3000); // 3秒后隐藏

          setMessage("Subscription successful! Check your email for updates.");
        } else {
          setMessage(
            resultSubscribeEmail.message ||
              "Failed to subscribe. Please try again."
          );
        }
      } else {
        setMessage(result.message || "Failed to subscribe. Please try again.");
      }
    } catch (error) {
      setMessage("An error occurred. Please try again later.");
      console.error("Error:", error);
    }

    // Reset form fields
    setName("");
    setScore("");
    setEmail("");
    setSelectedPrograms([]);
    setCurrentProgram("");
  };

  return (
    <div className="bg-white flex flex-col">
      {/* header*/}
      <Header setLanguage={setLanguage} language={language} />

      <div className="relative isolate px-6 pt-14 lg:px-8">
        <div
          aria-hidden="true"
          className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80"
        >
          <div
            style={{
              clipPath:
                "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
            }}
            className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
          />
        </div>
        <div className="mx-auto max-w-2xl py-32 sm:py-48 lg:py-56">
          <div className="hidden sm:mb-8 sm:flex sm:justify-center">
            <div className="relative rounded-full px-3 py-1 text-sm leading-6 text-gray-600 ring-1 ring-gray-900/10 hover:ring-gray-900/20">
              Powered by 🇨🇦 IRCC{" "}
            </div>
          </div>
          <div className="text-center">
            <h1 className="text-balance text-5xl font-semibold tracking-tight text-gray-900 sm:text-7xl">
              {translations[language].description}
            </h1>
            <p className="mt-8 text-pretty text-lg font-medium text-gray-500 sm:text-xl/8">
              {translations[language].aboutContent}
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <a
                href="#subscribe"
                className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                {translations[language].getStarted}
              </a>
              <a
                href="/dashboard"
                className="text-sm font-semibold leading-6 text-gray-900"
              >
                {translations[language].learnMore}
                <span aria-hidden="true">→</span>
              </a>
            </div>
          </div>
        </div>

        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          {/* subscribe section */}
          <div className="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-2">
            <div
              id="subscribe"
              className="max-w-xl lg:max-w-lg mx-auto p-6 text-center"
            >
              <h2 className="text-4xl font-semibold tracking-tight text-black">
                {translations[language].subscribe}
              </h2>
              <p className="mt-4 text-lg text-gray-500">
                {translations[language].subscribeContent}
              </p>
              <form className="mt-6 max-w-md" onSubmit={handleSubscribe}>
                <div className="flex flex-col mb-4">
                  <input
                    type="text"
                    placeholder={translations[language].enterYourName} // 姓名输入框
                    className="min-w-0 flex-auto rounded-md border-0 bg-black/5 px-3.5 py-2 text-black shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                  />
                </div>
                <div className="flex flex-col mb-4">
                  <input
                    type="email"
                    placeholder={translations[language].enterEmail}
                    className="min-w-0 flex-auto rounded-md border-0 bg-black/5 px-3.5 py-2 text-black shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
                <div className="mb-4">
                  <label className="block mb-2 text-black font-bold">
                    {translations[language].selectProgramsToFollow}
                  </label>
                  {programs.map((program) => (
                    <label
                      key={program}
                      className="inline-flex items-center mr-4"
                    >
                      <input
                        type="checkbox"
                        value={program}
                        checked={selectedPrograms.includes(program)}
                        onChange={(e) => {
                          const value = e.target.value;
                          setSelectedPrograms((prev) =>
                            prev.includes(value)
                              ? prev.filter((p) => p !== value)
                              : [...prev, value]
                          );
                        }}
                        className="flex-none rounded-md form-checkbox"
                      />
                      <span className="mt-1 leading-5 text-black">
                        {program}
                      </span>
                    </label>
                  ))}
                </div>
                <div className="mb-4">
                  <label className="block mb-2 text-black font-bold">
                    {translations[language].areYouCurrentlyInThePool}
                  </label>
                  <div className="flex items-center mb-4 justify-center">
                    <label className="mr-4 text-black">
                      <input
                        type="radio"
                        value="yes"
                        checked={inPool === true}
                        onChange={() => setInPool(true)}
                        className="form-radio text-black"
                      />
                      <span className="ml-2">Yes</span>
                    </label>
                    <label className="text-black">
                      <input
                        type="radio"
                        value="no"
                        checked={inPool === false}
                        onChange={() => setInPool(false)}
                        className="form-radio text-black"
                      />
                      <span className="ml-2">No</span>
                    </label>
                  </div>
                </div>
                {inPool && (
                  <>
                    <div className="mb-4">
                      <label className="block mb-2 text-black font-bold">
                        {translations[language].enterYourScore}
                      </label>
                      <input
                        type="number"
                        value={score}
                        onChange={(e) => setScore(e.target.value)}
                        className="min-w-0 flex-auto rounded-md border-0 bg-black/5 px-3.5 py-2 text-black shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6"
                        placeholder="Your Score"
                      />
                    </div>
                    <div className="mb-4">
                      <label className="block mb-2 text-black font-bold">
                        {translations[language].selectYourCurrentProgram}
                      </label>
                      <select
                        value={currentProgram}
                        onChange={(e) => setCurrentProgram(e.target.value)}
                        className="min-w-0 flex-auto rounded-md border-0 bg-black/5 px-3.5 py-2 text-black shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6"
                      >
                        <option value="">Select a Program</option>
                        {programs.map((program) => (
                          <option key={program} value={program}>
                            {program}
                          </option>
                        ))}
                      </select>
                    </div>
                  </>
                )}
                <button
                  type="submit"
                  className="flex-none rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
                >
                  {translations[language].subscribeButton}
                </button>
                {message && (
                  <p className="subscribe-message text-red-500 font-bold">
                    {message}
                  </p>
                )}
                {/* {showConfetti && <Confetti />} */}
              </form>
            </div>

            <div className="mt-5">
              {/* latest draw info */}
              <InfoCardForLatestDraw
                title={translations[language].latestDraw}
                content={
                  <>
                    <p className="text-black">
                      <span className="font-semibold">
                        {translations[language].programName}
                      </span>{" "}
                      {latestDraw.drawName}
                    </p>
                    <p className="text-black">
                      <span className="font-semibold">
                        {translations[language].minimumScore}
                      </span>{" "}
                      {latestDraw.drawCRS}
                    </p>
                    <p className="text-black">
                      <span className="font-semibold">
                        {translations[language].numberOfInvitations}
                      </span>{" "}
                      {latestDraw.drawSize}
                    </p>
                    <p className="text-black">
                      <span className="font-semibold">
                        {translations[language].date}
                      </span>{" "}
                      {latestDraw.drawDate}
                    </p>
                  </>
                }
              />

              {/* feature info */}
              <dl className="grid grid-cols-1 gap-x-8 gap-y-10 sm:grid-cols-2 lg:pt-2 mt-36">
                <div className="flex flex-col items-start">
                  <div className="rounded-md bg-black/5 p-2 ring-1 ring-black/10">
                    <CalendarDaysIcon
                      aria-hidden="true"
                      className="h-6 w-6 text-black"
                    />
                  </div>
                  <dt className="mt-4 font-semibold text-black">
                    {translations[language].instantNotification}
                  </dt>
                  <dd className="mt-2 leading-7 text-gray-500">
                    {translations[language].instantNotificationMsg}
                  </dd>
                </div>
                <div className="flex flex-col items-start">
                  <div className="rounded-md bg-black/5 p-2 ring-1 ring-black/10">
                    <HandRaisedIcon
                      aria-hidden="true"
                      className="h-6 w-6 text-black"
                    />
                  </div>
                  <dt className="mt-4 font-semibold text-black">
                    {translations[language].noSpam}
                  </dt>
                  <dd className="mt-2 leading-7 text-gray-500">
                    {translations[language].noSpamMsg}
                  </dd>
                </div>
              </dl>
            </div>
          </div>
        </div>

        <div
          aria-hidden="true"
          className="absolute inset-x-0 top-[calc(100%-13rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-30rem)]"
        >
          <div
            style={{
              clipPath:
                "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
            }}
            className="relative left-[calc(50%+3rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%+36rem)] sm:w-[72.1875rem]"
          />
        </div>
      </div>

      {/* why us info */}
      <div className="mx-auto max-w-2xl lg:mx-auto lg:max-w-none">
        <dl className="mt-16 grid grid-cols-1 gap-8 sm:mt-20 sm:grid-cols-2 lg:grid-cols-4 justify-items-center mb-16">
          {stats.map((stat) => (
            <div
              key={stat.name}
              className="flex flex-col-reverse gap-1 text-center"
            >
              <dt className="text-xl text-black">{stat.name}</dt>
              <dd className="text-4xl font-semibold tracking-tight text-black">
                {stat.value}
              </dd>
            </div>
          ))}
        </dl>
      </div>
      <Footer language={language} />
    </div>
  );
}
