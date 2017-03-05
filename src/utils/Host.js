/**
 * Created by gavan on 16-9-26.
 */
'use strict';

// process.env.NODE_ENV !== 'production' && module.hot
let __DEV = process.env.NODE_ENV !== 'production' && process.env.NODE_ENV !== 'testprod';
if (__DEV) {
  module.exports = {
    HOST: 'http://test.api.yb1v1.com/',
    HOST_ADMIN: 'http://dev.admin.yb1v1.com/',
    PUBLIC_DOWNLOAD_FILE_URL: 'http://ebtestpub.qiniudn.com',
    WORK_REPORT_URL_4STUDENT : 'http://192.168.0.5/doc/Tony/Project_test_folder/Webview/student_report_for_score.html', // for student
    LESSON_REPORT_URL_4STUDENT : 'http://192.168.0.5/doc/Tony/Project_test_folder/Webview/student_certificate.html', // for student
    WORK_REPORT_URL_4TEACHER : 'http://192.168.0.5/doc/Tony/Project_test_folder/Webview/teacher_report_for_action.html',// for teacher version
    LESSON_REPORT_URL_4TEACHER : 'http://192.168.0.5/doc/Tony/Project_test_folder/Webview/teacher_report_for_score.html',// for teacher version
    COMMENT_4SALES_URL  : "http://192.168.0.5/doc/stephen/test_teacher_comment/teacher_comment.html",
  };
} else {
  module.exports = {
    HOST: 'http://api.yb1v1.com/',
    HOST_ADMIN: 'http://admin.yb1v1.com/',
    PUBLIC_DOWNLOAD_FILE_URL: 'http://7u2f5q.com2.z0.glb.qiniucdn.com',
    WORK_REPORT_URL_4STUDENT : 'http://www.api.yb1v1.com/student_report_for_score.html', // for student
    LESSON_REPORT_URL_4STUDENT : 'http://www.api.yb1v1.com/student_certificate.html', // for student
    WORK_REPORT_URL_4TEACHER : 'http://www.api.yb1v1.com/teacher_report_for_action.html', // for teacher version
    LESSON_REPORT_URL_4TEACHER : 'http://www.api.yb1v1.com/teacher_report_for_score.html', // for teacher version
    COMMENT_4SALES_URL  : "http://www.api.yb1v1.com/teacher_comment.html",
  };
}
