import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Educator() {
  const navigate = useNavigate();

  const [allLessons, setAllLessons] = useState({});
  const [selectedTopic, setSelectedTopic] = useState(null);
  const [selectedLessonIndex, setSelectedLessonIndex] = useState(null);

  const [eduData, setEduData] = useState({
    simplifiedExplanation: "",
    example: "",
    difficulty: "",
    educatorNote: ""
  });

  // ================= LOAD LESSONS =================
useEffect(() => {
  let storedLessons = JSON.parse(localStorage.getItem("allLessons")) || {};

  const defaultLessons = {

    preamble: [
      {
        title: "Introduction to the Preamble",
        content:
          "The Preamble is the introductory statement of the Constitution of India. It expresses the guiding principles of the nation.",
        verified: true
      },
      {
        title: "Historical Background",
        content:
          "The Preamble is based on the Objectives Resolution introduced in 1946.",
        verified: true
      },
      {
        title: "Key Terms Explained",
        content:
          "Sovereign means independent. Socialist promotes equality. Secular ensures religious neutrality. Democratic means elected government. Republic means elected head.",
        verified: true
      },
      {
        title: "Importance in Interpretation",
        content:
          "The Preamble helps interpret constitutional provisions.",
        verified: true
      },
      {
        title: "Republic Meaning",
        content:
          "Republic means power rests with the people.",
        verified: true
      }
    ],

    rights: [
      {
        title: "Right to Equality (Articles 14-18)",
        content:
          "Ensures equality before law and prohibits discrimination.",
        verified: true
      },
      {
        title: "Right to Freedom (Articles 19-22)",
        content:
          "Includes speech, movement, profession freedoms.",
        verified: true
      },
      {
        title: "Right Against Exploitation",
        content:
          "Prohibits trafficking and forced labor.",
        verified: true
      },
      {
        title: "Freedom of Religion",
        content:
          "Ensures freedom to practice religion.",
        verified: true
      },
      {
        title: "Cultural & Educational Rights",
        content:
          "Protects minority cultural rights.",
        verified: true
      },
      {
        title: "Right to Constitutional Remedies",
        content:
          "Allows citizens to approach courts.",
        verified: true
      }
    ],

    duties: [
      {
        title: "Respect Constitution",
        content:
          "Citizens must respect Constitution and national symbols.",
        verified: true
      },
      {
        title: "Promote Harmony",
        content:
          "Encourages unity across diversity.",
        verified: true
      },
      {
        title: "Protect Environment",
        content:
          "Safeguard forests, rivers and wildlife.",
        verified: true
      },
      {
        title: "Develop Scientific Temper",
        content:
          "Encourages inquiry and critical thinking.",
        verified: true
      }
    ],

    directive: [
      {
        title: "Meaning of Directive Principles",
        content:
          "Guide state policy to build welfare state.",
        verified: true
      },
      {
        title: "Welfare State Objective",
        content:
          "Promotes equality and social justice.",
        verified: true
      },
      {
        title: "Non-Justiciable Nature",
        content:
          "Not enforceable in court but fundamental.",
        verified: true
      }
    ],
    amendments: [
      {
        title: "Need for Amendments",
        content:
          "Keeps Constitution dynamic.",
        verified: true
      },
      {
        title: "42nd Amendment",
        content:
          "Added Socialist and Secular to Preamble.",
        verified: true
      },
      {
        title: "Basic Structure Doctrine",
        content:
          "Basic features cannot be amended.",
        verified: true
      }
    ],

    about: [
      {
        title: "Adoption",
        content:
          "Adopted on 26 November 1949.",
        verified: true
      },
      {
        title: "Longest Written Constitution",
        content:
          "India has the longest written constitution.",
        verified: true
      },
      {
        title: "Borrowed Features",
        content:
          "Borrowed features from USA, UK, Ireland and Canada.",
        verified: true
      }
    ]
  };

  // 🔥 FORCE REPLACE EVERYTHING
  Object.keys(defaultLessons).forEach((section) => {
    storedLessons[section] = defaultLessons[section];
  });

  localStorage.setItem("allLessons", JSON.stringify(storedLessons));

  setAllLessons(storedLessons);

  if (Object.keys(storedLessons).length > 0) {
    setSelectedTopic(Object.keys(storedLessons)[0]);
  }
}, []);
  // ================= SAVE EDUCATOR UPDATE =================
  const handleSave = () => {
    const updated = { ...allLessons };
    const lesson = updated[selectedTopic][selectedLessonIndex];

    updated[selectedTopic][selectedLessonIndex] = {
      ...lesson,
      simplifiedExplanation: eduData.simplifiedExplanation,
      example: eduData.example,
      difficulty: eduData.difficulty,
      educatorNote: eduData.educatorNote,
      educatorUpdatedAt: new Date().toLocaleString()
    };

    saveLessons(updated);
    alert("Educational enhancements saved!");
  };

  const logout = () => navigate("/");

  const selectedLesson =
    selectedTopic && selectedLessonIndex !== null
      ? allLessons[selectedTopic][selectedLessonIndex]
      : null;

  return (
    <div className="flex h-screen bg-gray-100">

      {/* Sidebar */}
      <div className="w-64 bg-gradient-to-b from-orange-500 to-green-600 text-white p-6 flex flex-col space-y-3">
        <h1 className="text-xl font-bold mb-4">Educator Panel</h1>

        <button
          onClick={() => setSelectedLessonIndex(null)}
          className="text-left hover:bg-white hover:text-black px-3 py-2 rounded"
        >
          Improve Lessons
        </button>

        <button
          onClick={logout}
          className="mt-auto bg-white text-black py-2 rounded"
        >
          Logout
        </button>
      </div>

      {/* Content */}
      <div className="flex-1 p-10 overflow-y-auto">
        <div className="bg-white rounded-2xl shadow-xl p-8">

          <h2 className="text-3xl font-bold mb-6">
            Educational Enhancements
          </h2>

          <div className="flex gap-6">

            {/* LEFT SIDE → TOPICS */}
            <div className="w-1/4 border-r pr-4">
              {Object.keys(allLessons).map((topic) => (
                <div
                  key={topic}
                  onClick={() => {
                    setSelectedTopic(topic);
                    setSelectedLessonIndex(null);
                  }}
                  className={`cursor-pointer p-2 rounded mb-2 capitalize ${
                    selectedTopic === topic
                      ? "bg-gray-200 font-bold"
                      : ""
                  }`}
                >
                  {topic}
                </div>
              ))}
            </div>

            {/* RIGHT SIDE */}
            <div className="flex-1">

              {/* SHOW LESSON LIST */}
              {selectedTopic && selectedLessonIndex === null && (
                <>
                  <h3 className="text-xl font-semibold mb-4 capitalize">
                    {selectedTopic} Lessons
                  </h3>

                  {(allLessons[selectedTopic] || []).map(
                    (lesson, index) => (
                      <div
                        key={index}
                        onClick={() => {
                          setSelectedLessonIndex(index);
                          setEduData({
                            simplifiedExplanation:
                              lesson.simplifiedExplanation || "",
                            example: lesson.example || "",
                            difficulty:
                              lesson.difficulty || "",
                            educatorNote:
                              lesson.educatorNote || ""
                          });
                        }}
                        className="border p-4 rounded mb-3 cursor-pointer hover:bg-gray-100"
                      >
                        <div className="flex justify-between items-center">

                          <div>
                            <div className="font-semibold">
                              {lesson.title}
                            </div>

                            {lesson.difficulty && (
                              <div className="text-sm text-gray-600">
                                Difficulty: {lesson.difficulty}
                              </div>
                            )}
                          </div>

                          <div>
                            {lesson.verified ? (
                              <span className="text-green-600 font-semibold">
                                ✔ Verified
                              </span>
                            ) : (
                              <span className="text-yellow-600 font-semibold">
                                ⏳ Not Verified
                              </span>
                            )}
                          </div>

                        </div>
                      </div>
                    )
                  )}
                </>
              )}

              {/* SHOW FULL EDIT PANEL */}
              {selectedLesson && (
                <>
                  <button
                    onClick={() => setSelectedLessonIndex(null)}
                    className="text-blue-600 mb-4 underline"
                  >
                    ← Back
                  </button>

                  <h3 className="text-2xl font-bold mb-2">
                    {selectedLesson.title}
                  </h3>

                  {/* Original Content */}
                  <div className="bg-gray-100 p-4 rounded mb-6">
                    <h4 className="font-semibold mb-2">
                      Original Content:
                    </h4>
                    <p>{selectedLesson.content}</p>
                  </div>

                  {/* If Not Verified */}
                  {!selectedLesson.verified && (
                    <div className="bg-yellow-100 text-yellow-800 p-3 rounded mb-6">
                      This lesson must be legally verified before
                      educational enhancement.
                    </div>
                  )}

                  {/* FORM */}
                  <textarea
                    placeholder="Simplified Explanation"
                    value={eduData.simplifiedExplanation}
                    disabled={!selectedLesson.verified}
                    onChange={(e) =>
                      setEduData({
                        ...eduData,
                        simplifiedExplanation:
                          e.target.value
                      })
                    }
                    className="w-full border p-3 mb-3 rounded"
                  />

                  <textarea
                    placeholder="Real-life Example"
                    value={eduData.example}
                    disabled={!selectedLesson.verified}
                    onChange={(e) =>
                      setEduData({
                        ...eduData,
                        example: e.target.value
                      })
                    }
                    className="w-full border p-3 mb-3 rounded"
                  />

                  <select
                    value={eduData.difficulty}
                    disabled={!selectedLesson.verified}
                    onChange={(e) =>
                      setEduData({
                        ...eduData,
                        difficulty: e.target.value
                      })
                    }
                    className="w-full border p-3 mb-3 rounded"
                  >
                    <option value="">Select Difficulty</option>
                    <option value="Easy">Easy</option>
                    <option value="Medium">Medium</option>
                    <option value="Hard">Hard</option>
                  </select>

                  <textarea
                    placeholder="Educator Notes"
                    value={eduData.educatorNote}
                    disabled={!selectedLesson.verified}
                    onChange={(e) =>
                      setEduData({
                        ...eduData,
                        educatorNote: e.target.value
                      })
                    }
                    className="w-full border p-3 mb-4 rounded"
                  />

                  {selectedLesson.educatorUpdatedAt && (
                    <div className="text-sm text-gray-500 mb-4">
                      Last Updated:{" "}
                      {selectedLesson.educatorUpdatedAt}
                    </div>
                  )}

                  <button
                    onClick={handleSave}
                    disabled={!selectedLesson.verified}
                    className={`px-6 py-2 rounded ${
                      selectedLesson.verified
                        ? "bg-green-600 text-white"
                        : "bg-gray-400 text-white cursor-not-allowed"
                    }`}
                  >
                    Save Educational Updates
                  </button>
                </>
              )}

            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

export default Educator;