import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Citizen() {
  const navigate = useNavigate();

  const [activeSection, setActiveSection] = useState("home");
  const [selectedLesson, setSelectedLesson] = useState(null);
  const [userName, setUserName] = useState("");
  const [quizAnswers, setQuizAnswers] = useState({});
  const [quizSubmitted, setQuizSubmitted] = useState(false);
  const [allLessons, setAllLessons] = useState({});

useEffect(() => {
  const email = localStorage.getItem("userEmail");
  const name = localStorage.getItem("userName");

  if (!email) {
    navigate("/");
  } else {
    setUserName(name);
  }

let storedLessons = JSON.parse(localStorage.getItem("allLessons"));

if (!storedLessons) {

  // Add verified: true to ALL default lessons
  Object.keys(lessonsData).forEach((section) => {
    lessonsData[section] = lessonsData[section].map((lesson) => ({
      ...lesson,
      verified: true
    }));
  });

  localStorage.setItem("allLessons", JSON.stringify(lessonsData));
  storedLessons = lessonsData;

} else {

  // Ensure all topics exist
  Object.keys(lessonsData).forEach((key) => {
    if (!storedLessons[key]) {
      storedLessons[key] = [];
    }
  });

  // 🔥 FIX: If verified field missing, auto set it true
  Object.keys(storedLessons).forEach((section) => {
    storedLessons[section] = storedLessons[section].map((lesson) => ({
      ...lesson,
      verified: lesson.verified ?? true
    }));
  });

  localStorage.setItem("allLessons", JSON.stringify(storedLessons));
}

setAllLessons(storedLessons);
}, [navigate]);

  const logout = () => {
    localStorage.clear();
    navigate("/");
  };

  // ===================== LESSON DATA =====================

  const lessonsData = {
    
    preamble: [
      {
        title: "Introduction to the Preamble",
        content:
          "The Preamble is the introductory statement of the Constitution of India. It expresses the fundamental values and guiding principles of the nation. It declares India as a Sovereign, Socialist, Secular, Democratic Republic and ensures Justice, Liberty, Equality and Fraternity to all citizens. It reflects the dreams and aspirations of the people of India and sets the moral direction for governance.",
      
          
      },
      {
        title: "Historical Background",
        content:
          "The Preamble is based on the Objectives Resolution introduced by Jawaharlal Nehru in 1946. The Constituent Assembly debated it thoroughly before adopting it. It reflects the ideals of the freedom struggle and the commitment to building a democratic and inclusive society."
      },
      {
        title: "Key Terms Explained",
        content:
          "Sovereign means India is independent internally and externally. Socialist emphasizes reducing inequalities and promoting welfare policies. Secular ensures equal respect for all religions without state interference. Democratic means the government is elected by the people. Republic means the head of the state is elected and not hereditary."
      },
      {
        title: "Importance in Interpretation",
        content:
          "Though not enforceable in courts, the Preamble plays an important role in interpreting constitutional provisions. The Supreme Court has referred to it in landmark judgments to uphold constitutional values."
      },
      {
        title: "Republic Meaning",
        content:
          "Republic means supreme power rests with the people. In India, the President is elected by representatives of the people, symbolizing democratic sovereignty."
      }
    ],

    rights: [
      {
        title: "Right to Equality (Articles 14-18)",
        content:
          "This right guarantees equality before law and equal protection of laws. It prohibits discrimination based on religion, race, caste, sex, or place of birth. It abolishes untouchability and titles, ensuring equal dignity for every citizen."
      },
      {
        title: "Right to Freedom (Articles 19-22)",
        content:
          "Citizens enjoy freedoms such as speech and expression, peaceful assembly, movement, residence, and profession. These freedoms strengthen democracy but are subject to reasonable restrictions."
      },
      {
        title: "Right Against Exploitation",
        content:
          "Prohibits human trafficking, forced labor, and child labor in hazardous industries. It protects vulnerable sections of society from exploitation."
      },
      {
        title: "Freedom of Religion",
        content:
          "Ensures freedom of conscience and the right to profess, practice and propagate religion. It upholds the secular character of the Indian state."
      },
      {
        title: "Cultural & Educational Rights",
        content:
          "Protects the rights of minorities to preserve their culture, language, and script. They can establish and manage educational institutions."
      },
      {
        title: "Right to Constitutional Remedies",
        content:
          "Described as the heart and soul of the Constitution, it allows citizens to approach courts when fundamental rights are violated."
      }
    ],

    duties: [
      {
        title: "Respect Constitution",
        content:
          "Citizens must respect the Constitution, national flag, and national anthem. This strengthens national unity and democratic values."
      },
      {
        title: "Promote Harmony",
        content:
          "Encourages unity beyond religious, linguistic, and regional differences to maintain national integration."
      },
      {
        title: "Protect Environment",
        content:
          "Citizens must safeguard forests, rivers, wildlife and natural resources to ensure sustainable development."
      },
      {
        title: "Develop Scientific Temper",
        content:
          "Promotes inquiry, reform, humanism, and critical thinking for national progress."
      }
    ],

    directive: [
      {
        title: "Meaning of Directive Principles",
        content:
          "Directive Principles guide the state in policy-making to establish social and economic democracy. They aim to create a welfare state."
      },
      {
        title: "Welfare State Objective",
        content:
          "They promote public health, equal pay for equal work, protection of children, and reduction of income inequality."
      },
      {
        title: "Non-Justiciable Nature",
        content:
          "Though not enforceable by courts, they are fundamental in governance and influence policy decisions."
      }
    ],

    amendments: [
      {
        title: "Need for Amendments",
        content:
          "Amendments ensure the Constitution remains dynamic and responsive to changing social and political needs."
      },
      {
        title: "42nd Amendment",
        content:
          "The 42nd Amendment added Socialist and Secular to the Preamble and strengthened central powers."
      },
      {
        title: "Basic Structure Doctrine",
        content:
          "The Supreme Court ruled that basic features like democracy and secularism cannot be amended."
      }
    ],

    about: [
      {
        title: "Adoption",
        content:
          "The Constitution was adopted on 26 November 1949 and came into force on 26 January 1950, celebrated as Republic Day."
      },
      {
        title: "Longest Written Constitution",
        content:
          "India has the longest written constitution in the world with detailed governance provisions."
      },
      {
        title: "Borrowed Features",
        content:
          "It incorporates features from USA (Fundamental Rights), UK (Parliamentary System), Ireland (Directive Principles), and Canada (Federalism)."
      }
    ]
  };

  // ================= QUIZ =================

  const quizQuestions = [
    { question: "What does Sovereign mean?", options: ["Dependent", "Independent", "Religious"], answer: "Independent" },
    { question: "Article 14 ensures:", options: ["Freedom", "Equality", "Religion"], answer: "Equality" },
    { question: "Right to Freedom is under Article:", options: ["19", "21", "32"], answer: "19" },
    { question: "Directive Principles are:", options: ["Enforceable", "Guidelines", "Optional"], answer: "Guidelines" },
    { question: "Republic means:", options: ["King rule", "Elected head", "Military"], answer: "Elected head" },
    { question: "42nd Amendment added:", options: ["Justice", "Socialist", "Rights"], answer: "Socialist" },
    { question: "Right against Exploitation prohibits:", options: ["Voting", "Trafficking", "Taxes"], answer: "Trafficking" },
    { question: "Scientific temper is a:", options: ["Right", "Duty", "Law"], answer: "Duty" },
    { question: "Constitution adopted in:", options: ["1947", "1949", "1950"], answer: "1949" },
    { question: "Habeas Corpus protects:", options: ["Liberty", "Equality", "Religion"], answer: "Liberty" }
  ];

  const calculateScore = () => {
    let score = 0;
    quizQuestions.forEach((q, i) => {
      if (quizAnswers[i] === q.answer) score++;
    });
    return score;
  };

  const renderLessons = () => {
const lessons =
  (allLessons[activeSection] || []).filter(
    (lesson) => lesson.verified === true
  );

    if (selectedLesson === null) {
      return (
        <>
          <h2 className="text-2xl font-bold mb-4 capitalize">{activeSection} Lessons</h2>
          {lessons.map((lesson, index) => (
            <div
              key={index}
              onClick={() => setSelectedLesson(index)}
              className="border p-4 rounded mb-3 cursor-pointer hover:bg-gray-100"
            >
              Lesson {index + 1}: {lesson.title}
            </div>
          ))}
        </>
      );
    }

    const lesson = lessons[selectedLesson];

    return (
      <>
        <button onClick={() => setSelectedLesson(null)} className="mb-4 text-blue-600 underline">
          ← Back to Lessons
        </button>

        <h2 className="text-2xl font-bold mb-4">{lesson.title}</h2>
        <p className="text-gray-700 mb-6">{lesson.content}</p>

        <div className="flex justify-between">
          <button
            disabled={selectedLesson === 0}
            onClick={() => setSelectedLesson(selectedLesson - 1)}
            className="bg-gray-300 px-4 py-2 rounded disabled:opacity-50"
          >
            Previous
          </button>

          <button
            disabled={selectedLesson === lessons.length - 1}
            onClick={() => setSelectedLesson(selectedLesson + 1)}
            className="bg-green-600 text-white px-4 py-2 rounded disabled:opacity-50"
          >
            Next
          </button>
        </div>
      </>
    );
  };

  const renderQuiz = () => {
    const score = calculateScore();

    return (
      <>
        <h2 className="text-2xl font-bold mb-4">Interactive Quiz</h2>

        {quizQuestions.map((q, i) => (
          <div key={i} className="mb-6">
            <p className="font-semibold mb-2">{q.question}</p>
            {q.options.map((option, idx) => (
              <div key={idx}>
                <input
                  type="radio"
                  name={`question-${i}`}
                  disabled={quizSubmitted}
                  onChange={() => setQuizAnswers({ ...quizAnswers, [i]: option })}
                />{" "}
                {option}
              </div>
            ))}
          </div>
        ))}

        {!quizSubmitted && (
          <button onClick={() => setQuizSubmitted(true)} className="bg-green-600 text-white px-4 py-2 rounded">
            Submit Quiz
          </button>
        )}

        {quizSubmitted && (
          <p className="mt-4 font-bold">
            Your Score: {score} / {quizQuestions.length}
          </p>
        )}
      </>
    );
  };

  const renderContent = () => {
    if (activeSection === "home") {
      return (
        <>
          <h2 className="text-2xl font-bold mb-2">Welcome, {userName}</h2>
          <p className="text-gray-600 mb-6">
            Explore the Constitution modules from below and enhance your understanding of your rights and duties as a responsible citizen.
          </p>

          <div className="grid grid-cols-2 gap-4">
            {["preamble","rights","duties","directive","amendments","about","quiz"].map((section, index) => (
              <div
                key={index}
                onClick={() => { setActiveSection(section); setSelectedLesson(null); }}
                className="border p-4 rounded shadow hover:bg-gray-100 cursor-pointer capitalize"
              >
                {section}
              </div>
            ))}
          </div>
        </>
      );
    }

    if (activeSection === "quiz") return renderQuiz();
    if (allLessons[activeSection]) return renderLessons();

    return null;
  };

  return (
    <div className="flex h-screen bg-gray-100">
      <div className="w-64 bg-gradient-to-b from-orange-500 to-green-600 text-white p-6 flex flex-col space-y-3">
        <h1 className="text-xl font-bold mb-4">Citizen Dashboard</h1>

        <button onClick={() => { setActiveSection("home"); setSelectedLesson(null); }}>Home</button>
        <button onClick={() => { setActiveSection("preamble"); setSelectedLesson(null); }}>Preamble</button>
        <button onClick={() => { setActiveSection("rights"); setSelectedLesson(null); }}>Fundamental Rights</button>
        <button onClick={() => { setActiveSection("duties"); setSelectedLesson(null); }}>Fundamental Duties</button>
        <button onClick={() => { setActiveSection("directive"); setSelectedLesson(null); }}>Directive Principles</button>
        <button onClick={() => { setActiveSection("amendments"); setSelectedLesson(null); }}>Amendments</button>
        <button onClick={() => { setActiveSection("about"); setSelectedLesson(null); }}>About Constitution</button>
        <button onClick={() => { setActiveSection("quiz"); setSelectedLesson(null); }}>Quiz</button>

        <button onClick={logout} className="mt-auto bg-white text-black py-2 rounded">
          Logout
        </button>
      </div>

      <div className="flex-1 p-10 overflow-y-auto">
        <div className="bg-white rounded-xl shadow-md p-8">
          {renderContent()}
        </div>
      </div>
    </div>
  );
}

export default Citizen;