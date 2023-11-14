const filters = require('../../filters')
const { row } = require('./utils')

module.exports = (data) => {
  return {
    education: {
      rows: [
        // Been on a course of education?
        row({
          changeHref: 'education',
          changeHtml: 'Change',
          key: 'Have you been on a course of education since your claim date?',
          value: data.beenInEducationSinceClaimDate
        }),
        // Is OU course? (only show if yes to previous)
        data.beenInEducationSinceClaimDate === 'Yes' &&
        row({
          changeHref: 'education',
          changeHtml: 'Change',
          key: 'Are you studying with the Open University?',
          value: data.isOpenUniversityCourse
        }),
        // Course Title
        data.beenInEducationSinceClaimDate === 'Yes' &&
        row({
          changeHref: 'education-course-details',
          changeHtml: 'Change',
          key: 'Course title',
          value: data.courseTitle
        }),
        // Where studying
        data.beenInEducationSinceClaimDate === 'Yes' &&
        row({
          changeHref: 'education-course-details',
          changeHtml: 'Change',
          key: 'Where are you studying?',
          value: data.whereAreYouStudying
        }),
        // Name of teacher
        data.beenInEducationSinceClaimDate === 'Yes' &&
        row({
          changeHref: 'education-course-details',
          changeHtml: 'Change',
          key: 'Name of main teacher or tutor',
          value: data.mainTeacherOrTutor
        }),
        // Contact number (optional)
        data.beenInEducationSinceClaimDate === 'Yes' &&
        row({
          changeHref: 'education-course-details',
          changeHtml: 'Change',
          key: 'Course contact number (optional)',
          value: data.contactNumber ? data.contactNumber : 'Not provided'
        }),
        // Is this a university course?
        data.beenInEducationSinceClaimDate === 'Yes' &&
        row({
          changeHref: 'education-course-details',
          changeHtml: 'Change',
          key: 'Is this a university course?',
          value: data.isUniversityCourse
        })
      ]
    }
  }
}
