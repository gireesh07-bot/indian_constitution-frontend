import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function LegalExpert() {
  const navigate = useNavigate();

  const [allLessons, setAllLessons] = useState({});
  const [selectedTopic, setSelectedTopic] = useState(null);
  const [selectedLessonIndex, setSelectedLessonIndex] = useState(null);
  const [showOnlyPending, setShowOnlyPending] = useState(false);

  const [legalData, setLegalData] = useState({
    articleReference: "",
    caseLaw: "",
    legalNote: "",
    rejectionReason: ""
  });

  // ================= LOAD LESSONS =================
useEffect(() => {
  let storedLessons = JSON.parse(localStorage.getItem("allLessons"));

  // If nothing exists, create default lessons
  if (!storedLessons || Object.keys(storedLessons).length === 0) {

    const defaultLessons = {
      preamble: [
        { title: "Introduction to the Preamble", content: "Default Content", verified: true },
        { title: "Historical Background", content: "Default Content", verified: true }
      ],
      rights: [
        { title: "Right to Equality", content: "Default Content", verified: true }
      ],
      duties: [
        { title: "Respect Constitution", content: "Default Content", verified: true }
      ],
      directive: [],
      amendments: [],
      about: []
    };

    localStorage.setItem("allLessons", JSON.stringify(defaultLessons));
    storedLessons = defaultLessons;
  }

  // Ensure verified defaults to true
  Object.keys(storedLessons).forEach((section) => {
    storedLessons[section] = storedLessons[section].map((lesson) => ({
      ...lesson,
      verified: lesson.verified ?? true
    }));
  });

  localStorage.setItem("allLessons", JSON.stringify(storedLessons));

  setAllLessons(storedLessons);

  if (Object.keys(storedLessons).length > 0) {
    setSelectedTopic(Object.keys(storedLessons)[0]);
  }

}, []);

  const saveLessons = (updated) => {
    localStorage.setItem("allLessons", JSON.stringify(updated));
    setAllLessons(updated);
  };

  const getPendingCount = (topic) => {
    return (allLessons[topic] || []).filter(
      (lesson) => !lesson.verified
    ).length;
  };

  // ================= APPROVE =================
  const handleApprove = () => {
    const updated = { ...allLessons };
    const lesson = updated[selectedTopic][selectedLessonIndex];

    updated[selectedTopic][selectedLessonIndex] = {
      ...lesson,
      verified: true,
      rejected: false,
      rejectionReason: "",
      articleReference: legalData.articleReference,
      caseLaw: legalData.caseLaw,
      legalNote: legalData.legalNote
    };

    saveLessons(updated);
    alert("Lesson Verified Successfully!");
  };

  // ================= REJECT =================
  const handleReject = () => {
    if (!legalData.rejectionReason.trim()) {
      alert("Please provide rejection reason");
      return;
    }

    const updated = { ...allLessons };
    const lesson = updated[selectedTopic][selectedLessonIndex];

    updated[selectedTopic][selectedLessonIndex] = {
      ...lesson,
      verified: false,
      rejected: true,
      rejectionReason: legalData.rejectionReason
    };

    saveLessons(updated);
    alert("Lesson Rejected");
  };

  const logout = () => navigate("/");

  return (
    <div className="flex h-screen bg-gray-100">

      {/* Sidebar */}
      <div className="w-64 bg-gradient-to-b from-orange-500 to-green-600 text-white p-6 flex flex-col space-y-3">
        <h1 className="text-xl font-bold mb-4">Legal Expert Panel</h1>

        <button
          onClick={() => {
            setSelectedLessonIndex(null);
            setShowOnlyPending(false);
          }}
          className="text-left hover:bg-white hover:text-black px-3 py-2 rounded"
        >
          Review Lessons
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
            Review & Verify Lessons
          </h2>

          {/* Filter Toggle */}
          <div className="mb-6">
            <button
              onClick={() => setShowOnlyPending(false)}
              className={`px-4 py-2 mr-3 rounded ${
                !showOnlyPending
                  ? "bg-green-600 text-white"
                  : "bg-gray-200"
              }`}
            >
              Show All Verified
            </button>

            <button
              onClick={() => setShowOnlyPending(true)}
              className={`px-4 py-2 rounded ${
                showOnlyPending
                  ? "bg-green-600 text-white"
                  : "bg-gray-200"
              }`}
            >
              Show Only Pending
            </button>
          </div>

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
                  {topic} ({getPendingCount(topic)} Pending)
                </div>
              ))}
            </div>

            {/* RIGHT SIDE */}
            <div className="flex-1">

              {selectedTopic && selectedLessonIndex === null && (
                <>
                  <h3 className="text-xl font-semibold mb-4 capitalize">
                    {selectedTopic} Subtopics
                  </h3>

                  {
(allLessons[selectedTopic] || [])
.filter((lesson) => {
  if (showOnlyPending) {
    return lesson.verified === false;
  }
  return lesson.verified !== false;
})
.map((lesson, index) => (
                      <div
                        key={index}
                        onClick={() => {
                          setSelectedLessonIndex(index);
                          setLegalData({
                            articleReference:
                              lesson.articleReference || "",
                            caseLaw: lesson.caseLaw || "",
                            legalNote: lesson.legalNote || "",
                            rejectionReason:
                              lesson.rejectionReason || ""
                          });
                        }}
                        className="border p-4 rounded mb-3 cursor-pointer hover:bg-gray-100"
                      >
                        <div className="flex justify-between items-center">
                          <div>
                            <div className="font-semibold">
                              {lesson.title}
                            </div>
                          </div>

                          <div>
                            {lesson.verified ? (
                              <span className="text-green-600 font-semibold">
                                ✔ Verified
                              </span>
                            ) : lesson.rejected ? (
                              <span className="text-red-600 font-semibold">
                                ❌ Rejected
                              </span>
                            ) : (
                              <span className="text-yellow-600 font-semibold">
                                ⏳ Pending
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                </>
              )}

              {/* FULL LESSON VIEW (UNCHANGED) */}
              {selectedTopic && selectedLessonIndex !== null && (
                <>
                  <button
                    onClick={() => setSelectedLessonIndex(null)}
                    className="text-blue-600 mb-4 underline"
                  >
                    ← Back to Subtopics
                  </button>

                  <h3 className="text-2xl font-bold mb-2">
                    {allLessons[selectedTopic][selectedLessonIndex].title}
                  </h3>

                  <p className="mb-6">
                    {allLessons[selectedTopic][selectedLessonIndex].content}
                  </p>

                  <input
                    type="text"
                    placeholder="Article Reference"
                    value={legalData.articleReference}
                    onChange={(e) =>
                      setLegalData({
                        ...legalData,
                        articleReference: e.target.value
                      })
                    }
                    className="w-full border p-3 mb-3 rounded"
                  />

                  <input
                    type="text"
                    placeholder="Case Law"
                    value={legalData.caseLaw}
                    onChange={(e) =>
                      setLegalData({
                        ...legalData,
                        caseLaw: e.target.value
                      })
                    }
                    className="w-full border p-3 mb-3 rounded"
                  />

                  <textarea
                    placeholder="Legal Notes"
                    value={legalData.legalNote}
                    onChange={(e) =>
                      setLegalData({
                        ...legalData,
                        legalNote: e.target.value
                      })
                    }
                    className="w-full border p-3 mb-3 rounded"
                  />

                  <textarea
                    placeholder="Rejection Reason"
                    value={legalData.rejectionReason}
                    onChange={(e) =>
                      setLegalData({
                        ...legalData,
                        rejectionReason: e.target.value
                      })
                    }
                    className="w-full border p-3 mb-4 rounded"
                  />

                  <div className="flex gap-4">
                    <button
                      onClick={handleApprove}
                      className="bg-green-600 text-white px-6 py-2 rounded"
                    >
                      Approve
                    </button>

                    <button
                      onClick={handleReject}
                      className="bg-red-600 text-white px-6 py-2 rounded"
                    >
                      Reject
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LegalExpert;