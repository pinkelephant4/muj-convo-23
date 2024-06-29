const questions = [
  {
    ques: 'Name',
    ans: '',
    type: 'text',
    notEditable: true,
  },
  {
    ques: 'Degree',
    ans: '',
    type: 'text',
    notEditable: true,
  },
  {
    ques: 'Branch',
    ans: '',
    type: 'text',
    notEditable: true,
  },
  {
    ques: 'Graduate Year',
    ans: '',
    type: 'text',
    notEditable: true,
  },
  {
    ques: 'Organization Name (Current Organization you are working for, N/A if none)',
    ans: '',
    type: 'text',
  },
  {
    ques: "Designation (Current Organization's designation, N/A if none)",
    ans: '',
    type: 'text',
  },
  {
    ques: 'Year of joining the organization, N/A if none',
    ans: '',
    type: 'text',
  },
  //!questions
  //1
  {
    ques: 'Quality of course content including the project work during your entire Programme.',
    ans: '',
    type: 'radio',
    enum: ['Poor', 'Fair', 'Good', 'Very Good', 'Excellent'],
  },
  //2
  {
    ques: 'How do you rate the coverage of courses during Programme?',
    ans: '',
    type: 'radio',
    enum: ['Poor', 'Fair', 'Good', 'Very Good', 'Excellent'],
  },
  //3
  {
    ques: 'How do you rate the curriculum helps in your employment.',
    ans: '',
    type: 'radio',
    enum: ['Poor', 'Fair', 'Good', 'Very Good', 'Excellent'],
  },
  //4
  {
    ques: 'How do you rate the competitive examinations syllabus covered in programed syllabus.',
    ans: '',
    type: 'radio',
    enum: ['Poor', 'Fair', 'Good', 'Very Good', 'Excellent'],
  },
  //5
  {
    ques: 'How do you rate the syllabus applicability/relevance to real life situation?',
    ans: '',
    type: 'radio',
    enum: ['Poor', 'Fair', 'Good', 'Very Good', 'Excellent'],
  },
  //6
  {
    ques: 'How do you rate the Programme curriculum in terms of knowledge, concepts, skills, analytical abilities and broadening perspectives?',
    ans: '',
    type: 'radio',
    enum: ['Poor', 'Fair', 'Good', 'Very Good', 'Excellent'],
  },
  //7
  {
    ques: 'How do you rate the Programme orient on institutional vision and mission',
    ans: '',
    type: 'radio',
    enum: ['Poor', 'Fair', 'Good', 'Very Good', 'Excellent'],
  },
  //8
  {
    ques: 'How do you rate the class room teaching material about Clarity and relevance to the syllabus?',
    ans: '',
    type: 'radio',
    enum: ['Poor', 'Fair', 'Good', 'Very Good', 'Excellent'],
  },
  //9
  {
    ques: 'How do you rate course evaluation methods?',
    ans: '',
    type: 'radio',
    enum: ['Poor', 'Fair', 'Good', 'Very Good', 'Excellent'],
  },
  //10
  {
    ques: 'How do you rate the focused towards the research orientation during the Programme?',
    ans: '',
    type: 'radio',
    enum: ['Poor', 'Fair', 'Good', 'Very Good', 'Excellent'],
  },
  //! different enums
  //11
  {
    ques: 'Teachers inform you about your expected competencies, course outcomes and Programme outcomes.',
    ans: '',
    type: 'radio',
    enum: ['Never', 'Rarely', 'Sometimes', 'Usually', 'Every time'],
  },
  //12
  {
    ques: 'The teachers identify your strengths and encourage you with providing right level of challenges.',
    ans: '',
    type: 'radio',
    enum: ['Unable to', 'Slightly', 'Partially', 'Reasonably', 'Fully'],
  },
  //13
  {
    ques: 'Teachers are able to identify your weaknesses and help you to overcome them.',
    ans: '',
    type: 'radio',
    enum: ['Never', 'Rarely', 'Sometimes', 'Usually', 'Every Time'],
  },
  //14
  {
    ques: 'The institute/ teachers use student centric methods, such as experiential learning, participative learning and problem solving methodologies for enhancing learning experiences.',
    ans: '',
    type: 'radio',
    enum: [
      'Not at all',
      'Very little',
      'Somewhat',
      'Moderate',
      'To a great extent',
    ],
  },
  //15
  {
    ques: 'Teachers encourage you to participate in extracurricular activities.',
    ans: '',
    type: 'radio',
    enum: [
      'Strongly disagree',
      'Disagree',
      'Neutral',
      'Agree',
      'Strongly agree',
    ],
  },
  //16
  {
    ques: 'Efforts are made by the institute/ teachers to inculcate soft skills, life skills and employability skills to make you ready for the world of   Work.',
    ans: '',
    type: 'radio',
    enum: [
      'Not at all',
      'Very little',
      'Somewhat',
      'Moderate',
      'To a great extent',
    ],
  },
  //17
  {
    ques: 'The overall quality of teaching-learning process during the entire Programme is very good.',
    ans: '',
    type: 'radio',
    enum: [
      'Strongly disagree',
      'Disagree',
      'Neutral',
      'Agree',
      'Strongly agree',
    ],
  },
  //18
  {
    ques: 'Lab facility',
    ans: '',
    type: 'radio',
    enum: ['Poor', 'Average', 'Good', 'Very Good', 'Outstanding'],
  },
  //19
  {
    ques: 'Class Rooms Cleanliness',
    ans: '',
    type: 'radio',
    enum: ['Poor', 'Average', 'Good', 'Very Good', 'Outstanding'],
  },
  //20
  {
    ques: 'Library Facility',
    ans: '',
    type: 'radio',
    enum: ['Poor', 'Average', 'Good', 'Very Good', 'Outstanding'],
  },
  //!Agree/disagree
  //1
  {
    ques: 'Resources are appropriate for my course needs.',
    ans: '',
    type: 'radio',
    enum: [
      'Strongly disagree',
      'Disagree',
      'Neutral',
      'Agree',
      'Strongly agree',
    ],
  },
  //2
  {
    ques: 'Resources are current and relevant.',
    ans: '',
    type: 'radio',
    enum: [
      'Strongly disagree',
      'Disagree',
      'Neutral',
      'Agree',
      'Strongly agree',
    ],
  },
  //3
  {
    ques: 'Resources are easy to find.',
    ans: '',
    type: 'radio',
    enum: [
      'Strongly disagree',
      'Disagree',
      'Neutral',
      'Agree',
      'Strongly agree',
    ],
  },
  //4
  {
    ques: 'Borrowing resources policies and procedures are clearly stated.',
    ans: '',
    type: 'radio',
    enum: [
      'Strongly disagree',
      'Disagree',
      'Neutral',
      'Agree',
      'Strongly agree',
    ],
  },
  //5
  {
    ques: 'I usually find the resources I need.',
    ans: '',
    type: 'radio',
    enum: [
      'Strongly disagree',
      'Disagree',
      'Neutral',
      'Agree',
      'Strongly agree',
    ],
  },
  //6
  {
    ques: 'I usually ask the library staff for assistance.',
    ans: '',
    type: 'radio',
    enum: [
      'Strongly disagree',
      'Disagree',
      'Neutral',
      'Agree',
      'Strongly agree',
    ],
  },
  //7
  {
    ques: 'I find that there are always resources available that address assignment questions.',
    ans: '',
    type: 'radio',
    enum: [
      'Strongly disagree',
      'Disagree',
      'Neutral',
      'Agree',
      'Strongly agree',
    ],
  },
  //8
  {
    ques: 'Recommendations for new or different resources are listened to by the library staff.',
    ans: '',
    type: 'radio',
    enum: [
      'Strongly disagree',
      'Disagree',
      'Neutral',
      'Agree',
      'Strongly agree',
    ],
  },
  //!suggestions text
  {
    ques: 'Relevance of curriculum in your Job:',
    ans: '',
    type: 'text',
  },
  {
    ques: 'Need any change in curriculum and syllabus:',
    ans: '',
    type: 'text',
  },
  {
    ques: 'Improvements in teaching and learning Process:',
    ans: '',
    type: 'text',
  },
  {
    ques: 'Have you learned the basic concept through your Project / Dissertation / Internship/ Assignments?',
    ans: '',
    type: 'text',
  },
  {
    ques: 'Any other suggestions/comments:',
    ans: '',
    type: 'text',
  },
];

module.exports = questions;
