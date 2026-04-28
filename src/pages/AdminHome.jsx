import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function AdminHome() {
  const navigate = useNavigate();

  const [activeSection, setActiveSection] = useState("dashboard");
  const [allLessons, setAllLessons] = useState({});
  const [quizQuestions, setQuizQuestions] = useState([]);
  const [selectedViewSection, setSelectedViewSection] = useState("preamble"); // ✅ ADDED
  const [selectedTopic, setSelectedTopic] = useState(null);
const [selectedLessonIndex, setSelectedLessonIndex] = useState(null);

  const [formData, setFormData] = useState({
    section: "preamble",
    title: "",
    content: ""
  });

  const [quizForm, setQuizForm] = useState({
    question: "",
    options: ["", "", "", ""],
    answer: ""
  });

  const [editingLesson, setEditingLesson] = useState(null);
  const [editingQuiz, setEditingQuiz] = useState(null);

  // ================= LOAD DATA =================
useEffect(() => {

  const defaultLessons = {
    preamble: [
      { title: "Introduction to the Preamble", content: "The Preamble declares India as Sovereign, Socialist, Secular, Democratic Republic." },
      { title: "Historical Background", content: "Based on Objectives Resolution 1946." },
      { title: "Key Terms Explained", content: "Sovereign means independent. Socialist promotes welfare." },
      { title: "Importance in Interpretation", content: "Helps courts interpret constitutional provisions." },
      { title: "Republic Meaning", content: "Head of state is elected." }
    ],

    rights: [
      { title: "Right to Equality", content: "Articles 14-18 guarantee equality." },
      { title: "Right to Freedom", content: "Includes speech and movement." },
      { title: "Right Against Exploitation", content: "Prohibits trafficking and forced labour." },
      { title: "Freedom of Religion", content: "Right to practice religion." },
      { title: "Cultural & Educational Rights", content: "Protects minority rights." },
      { title: "Right to Constitutional Remedies", content: "Allows citizens to approach courts." }
    ],

    duties: [
      { title: "Respect Constitution", content: "Respect flag and anthem." },
      { title: "Promote Harmony", content: "Encourage unity." },
      { title: "Protect Environment", content: "Safeguard forests and wildlife." },
      { title: "Develop Scientific Temper", content: "Promote rational thinking." }
    ],

    directive: [
      { title: "Meaning of Directive Principles", content: "Guidelines for governance." },
      { title: "Welfare State Objective", content: "Promotes equal pay and health." },
      { title: "Non-Justiciable Nature", content: "Not enforceable by courts." }
    ],

    amendments: [
      { title: "Need for Amendments", content: "Allows Constitution to adapt." },
      { title: "42nd Amendment", content: "Added Socialist and Secular." },
      { title: "Basic Structure Doctrine", content: "Basic features cannot change." }
    ],

    about: [
      { title: "Adoption", content: "Adopted in 1949." },
      { title: "Longest Written Constitution", content: "India has longest constitution." },
      { title: "Borrowed Features", content: "From USA, UK, Ireland, Canada." }
    ]
  };

  // 🔥 FORCE RESET
  localStorage.setItem("allLessons", JSON.stringify(defaultLessons));

  setAllLessons(defaultLessons);
  setSelectedTopic("preamble");

  const storedQuiz = JSON.parse(localStorage.getItem("quizQuestions")) || [];
  setQuizQuestions(storedQuiz);

}, []);

  const saveLessons = (updated) => {
    localStorage.setItem("allLessons", JSON.stringify(updated));
    setAllLessons(updated);
  };

  const saveQuiz = (updated) => {
    localStorage.setItem("quizQuestions", JSON.stringify(updated));
    setQuizQuestions(updated);
  };

  // ================= LESSON CRUD =================

  const handleAddLesson = () => {
    if (!formData.title.trim() || !formData.content.trim()) return;

    const updated = { ...allLessons };
    updated[formData.section].push({
  title: formData.title,
  content: formData.content,
  verified: false   // VERY IMPORTANT
});

    saveLessons(updated);

    setFormData({
      section: "preamble",
      title: "",
      content: ""
    });
  };

  const handleDeleteLesson = (section, index) => {
    const updated = { ...allLessons };
    updated[section] = updated[section].filter((_, i) => i !== index);
    saveLessons(updated);
  };

  const handleEditLesson = (section, index) => {
    const lesson = allLessons[section][index];
    setFormData({
      section,
      title: lesson.title,
      content: lesson.content
    });
    setEditingLesson({ section, index });
    setActiveSection("addLesson");
  };

  const handleUpdateLesson = () => {
    if (!editingLesson) return;

    const updated = { ...allLessons };
    updated[editingLesson.section][editingLesson.index] = {
      title: formData.title,
      content: formData.content
    };

    saveLessons(updated);
    setEditingLesson(null);

    setFormData({
      section: "preamble",
      title: "",
      content: ""
    });
  };

  // ================= QUIZ CRUD =================

  const handleAddQuiz = () => {
    if (!quizForm.question.trim() || !quizForm.answer.trim()) return;

    const updated = [...quizQuestions, quizForm];
    saveQuiz(updated);

    setQuizForm({
      question: "",
      options: ["", "", "", ""],
      answer: ""
    });
  };

  const handleDeleteQuiz = (index) => {
    const updated = quizQuestions.filter((_, i) => i !== index);
    saveQuiz(updated);
  };

  const handleEditQuiz = (index) => {
    setQuizForm(quizQuestions[index]);
    setEditingQuiz(index);
  };

  const handleUpdateQuiz = () => {
    if (editingQuiz === null) return;

    const updated = [...quizQuestions];
    updated[editingQuiz] = quizForm;
    saveQuiz(updated);

    setEditingQuiz(null);
    setQuizForm({
      question: "",
      options: ["", "", "", ""],
      answer: ""
    });
  };

  const logout = () => navigate("/");

  return (
    <div className="flex h-screen bg-gray-100">

      {/* Sidebar */}
      <div className="w-64 bg-gradient-to-b from-orange-500 to-green-600 text-white p-6 flex flex-col space-y-3">
        <h1 className="text-xl font-bold mb-4">Admin Panel</h1>

        <button onClick={() => setActiveSection("dashboard")} className="text-left hover:bg-white hover:text-black px-3 py-2 rounded">
          Dashboard
        </button>

        <button onClick={() => setActiveSection("addLesson")} className="text-left hover:bg-white hover:text-black px-3 py-2 rounded">
          Add Lesson
        </button>

        <button onClick={() => setActiveSection("viewLessons")} className="text-left hover:bg-white hover:text-black px-3 py-2 rounded">
          View Lessons
        </button>

        <button onClick={() => setActiveSection("quiz")} className="text-left hover:bg-white hover:text-black px-3 py-2 rounded">
          Manage Quiz
        </button>

        <button onClick={logout} className="mt-auto bg-white text-black py-2 rounded">
          Logout
        </button>
      </div>

      {/* Content */}
      <div className="flex-1 p-10 overflow-y-auto">
        <div className="bg-white rounded-2xl shadow-xl p-8">

          {/* Dashboard */}
          {activeSection === "dashboard" && (
            <>
              <h2 className="text-3xl font-bold mb-4">Admin Dashboard</h2>
              <p>Total Lessons: {Object.values(allLessons).flat().length}</p>
              <p>Total Quiz Questions: {quizQuestions.length}</p>
            </>
          )}

          {/* Add Lesson */}
          {activeSection === "addLesson" && (
            <>
              <h2 className="text-2xl font-bold mb-4">
                {editingLesson ? "Update Lesson" : "Add Lesson"}
              </h2>

              <select
                value={formData.section}
                onChange={(e) =>
                  setFormData({ ...formData, section: e.target.value })
                }
                className="w-full border p-3 mb-3 rounded"
              >
                {Object.keys(allLessons).map((sec) => (
                  <option key={sec} value={sec}>{sec}</option>
                ))}
              </select>

              <input
                type="text"
                placeholder="Lesson Title"
                value={formData.title}
                onChange={(e) =>
                  setFormData({ ...formData, title: e.target.value })
                }
                className="w-full border p-3 mb-3 rounded"
              />

              <textarea
                placeholder="Lesson Content"
                value={formData.content}
                onChange={(e) =>
                  setFormData({ ...formData, content: e.target.value })
                }
                className="w-full border p-3 mb-3 rounded"
              />

              <button
                onClick={editingLesson ? handleUpdateLesson : handleAddLesson}
                className="bg-green-600 text-white px-4 py-2 rounded"
              >
                {editingLesson ? "Update Lesson" : "Add Lesson"}
              </button>
            </>
          )}

          {/* View Lessons */}
{activeSection === "viewLessons" && (
  <>
    <h2 className="text-2xl font-bold mb-6">All Lessons</h2>

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
              selectedTopic === topic ? "bg-gray-200 font-bold" : ""
            }`}
          >
            {topic}
          </div>
        ))}
      </div>

      {/* RIGHT SIDE */}
      <div className="flex-1">

        {/* Show subtopics automatically */}
        {selectedTopic && (
          <>
            <h3 className="text-xl font-semibold mb-4 capitalize">
              {selectedTopic} Subtopics
            </h3>

            {(allLessons[selectedTopic] || []).map((lesson, index) => (
              <div
                key={index}
                onClick={() => setSelectedLessonIndex(index)}
                className="border p-3 rounded mb-3 cursor-pointer hover:bg-gray-100"
              >
                {lesson.title}
              </div>
            ))}

            {(allLessons[selectedTopic] || []).length === 0 && (
              <p className="text-gray-500">
                No lessons available in this topic.
              </p>
            )}
          </>
        )}

        {/* Show full lesson */}
        {selectedTopic && selectedLessonIndex !== null && (
          <>
            <button
              onClick={() => setSelectedLessonIndex(null)}
              className="text-blue-600 mb-4 underline"
            >
              ← Back
            </button>

            <h3 className="text-xl font-bold mb-2">
              {allLessons[selectedTopic][selectedLessonIndex].title}
            </h3>

            <p className="mb-4">
              {allLessons[selectedTopic][selectedLessonIndex].content}
            </p>

            <button
              onClick={() =>
                handleEditLesson(selectedTopic, selectedLessonIndex)
              }
              className="bg-blue-500 text-white px-3 py-1 rounded mr-2"
            >
              Edit
            </button>

            <button
              onClick={() =>
                handleDeleteLesson(selectedTopic, selectedLessonIndex)
              }
              className="bg-red-500 text-white px-3 py-1 rounded"
            >
              Delete
            </button>
          </>
        )}

      </div>
    </div>
  </>
)}
          {/* Quiz section unchanged */}
          {activeSection === "quiz" && (
            <>
              <h2 className="text-2xl font-bold mb-4">
                {editingQuiz !== null ? "Update Quiz Question" : "Add Quiz Question"}
              </h2>

              <input
                type="text"
                placeholder="Question"
                value={quizForm.question}
                onChange={(e) =>
                  setQuizForm({ ...quizForm, question: e.target.value })
                }
                className="w-full border p-3 mb-3 rounded"
              />

              {quizForm.options.map((opt, i) => (
                <input
                  key={i}
                  type="text"
                  placeholder={`Option ${i + 1}`}
                  value={opt}
                  onChange={(e) => {
                    const updated = [...quizForm.options];
                    updated[i] = e.target.value;
                    setQuizForm({ ...quizForm, options: updated });
                  }}
                  className="w-full border p-3 mb-3 rounded"
                />
              ))}

              <input
                type="text"
                placeholder="Correct Answer"
                value={quizForm.answer}
                onChange={(e) =>
                  setQuizForm({ ...quizForm, answer: e.target.value })
                }
                className="w-full border p-3 mb-3 rounded"
              />

              <button
                onClick={editingQuiz !== null ? handleUpdateQuiz : handleAddQuiz}
                className="bg-green-600 text-white px-4 py-2 rounded"
              >
                {editingQuiz !== null ? "Update Question" : "Add Question"}
              </button>

              <div className="mt-6">
                {quizQuestions.map((q, i) => (
                  <div key={i} className="border p-4 rounded mb-3">
                    <p className="font-bold">{q.question}</p>

                    <button
                      onClick={() => handleEditQuiz(i)}
                      className="bg-blue-500 text-white px-3 py-1 rounded mr-2"
                    >
                      Edit
                    </button>

                    <button
                      onClick={() => handleDeleteQuiz(i)}
                      className="bg-red-500 text-white px-3 py-1 rounded"
                    >
                      Delete
                    </button>
                  </div>
                ))}
              </div>
            </>
          )}

        </div>
      </div>
    </div>
  );
}

export default AdminHome;