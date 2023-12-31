import { useState } from "react";
import { useCVContext } from "../../context/CVContext";
import { v4 as randomId } from "uuid";
import { IoIosTrash, IoMdCreate } from "react-icons/io";

const EducationForm = () => {
  const [education, setEducation] = useState({
    id: "",
    school: "",
    degree: "",
    startDate: "",
    endDate: "",
    location: "",
  });

  const { setEducations, educations } = useCVContext();

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setEducation((prevProperty) => ({ ...prevProperty, [name]: value }));
  };

  const handleAddEducation = (e) => {
    e.preventDefault();
    setEducations([...educations, { ...education, id: randomId() }]);
    setEducation({
      school: "",
      degree: "",
      startDate: "",
      endDate: "",
      location: "",
    });
    console.log(educations);
  };

  const handleDeleteEducation = (id) => {
    const toRemove = educations.find((education) => education.id === id);
    setEducations(educations.filter((education) => education != toRemove));
  };

  const setEducationInForm = (id) => {
    const toDisplay = educations.find((education) => education.id === id);
    setEducation({
      ...education,
      id: toDisplay.id,
      school: toDisplay.school,
      degree: toDisplay.degree,
      startDate: toDisplay.startDate,
      endDate: toDisplay.endDate,
      location: toDisplay.location,
    });

  };

  const handleEditEducation = (id) => {
    const updatedEducation = {
      school: education.school, 
      degree: education.degree, 
      startDate: education.startDate, 
      endDate: education.endDate, 
      location: education.location,
    }

    setEducations((educations) => educations.map((education)=>education.id === id ? {...education, ...updatedEducation} : education));
    
    setEducation({
      school: "",
      degree: "",
      startDate: "",
      endDate: "",
      location: "",
    });
  };

  return (
    <div>
      <form onSubmit={handleAddEducation}>
        <h3>Education</h3>
        <label htmlFor="school">School</label>
        <input
          type="text"
          id="school"
          placeholder="Enter school name"
          name="school"
          value={education.school}
          onChange={handleOnChange}
        />

        <label htmlFor="degree">Degree</label>
        <input
          type="text"
          id="degree"
          placeholder="Enter degree title"
          name="degree"
          value={education.degree}
          onChange={handleOnChange}
        />

        <label htmlFor="start-date">Start Date</label>
        <input
          type="date"
          id="start-date"
          placeholder="Select start date"
          name="startDate"
          value={education.startDate}
          onChange={handleOnChange}
        />

        <label htmlFor="end-date">End Date</label>
        <input
          type="date"
          id="end-date"
          placeholder="Select end date"
          name="endDate"
          value={education.endDate}
          onChange={handleOnChange}
        />

        <label htmlFor="location">Location</label>
        <input
          type="text"
          id="location"
          placeholder="Enter location"
          name="location"
          value={education.location}
          onChange={handleOnChange}
        />

        <div className="buttons-wrapper">
          <input type="submit" value="Save" className="btn-submit" />
          <button
            type="button"
            className="btn-edit"
            onClick={() => {handleEditEducation(education.id)}}
          >
            Edit
          </button>
        </div>

        <div className="div-config">
          {educations.map((education) => (
            <div key={education.id}>
              <p>{education.school + " - " + education.degree}</p>
              <button
                type="button"
                onClick={() => {
                  handleDeleteEducation(education.id);
                }}
              >
                <IoIosTrash />
              </button>
              <button
                type="button"
                onClick={() => {
                  setEducationInForm(education.id);
                }}
              >
                <IoMdCreate />
              </button>
            </div>
          ))}
        </div>
      </form>
    </div>
  );
};

export default EducationForm;
