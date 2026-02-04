import style from './page.module.css';

export const dynamic = 'force-dynamic';
// ป้องกัน cache ตอน puppeteer เรียก

// ข้อมูลนักศึกษาตัวอย่าง
const studentInfo = {
  studentId: '6401012345678',
  nameTh: 'นายสมชาย ใจดี',
  nameEn: 'Mr. Somchai Jaidee',
  faculty: 'คณะวิศวกรรมศาสตร์',
  department: 'ภาควิชาวิศวกรรมคอมพิวเตอร์',
  program: 'วิศวกรรมศาสตรบัณฑิต สาขาวิศวกรรมคอมพิวเตอร์',
  admissionYear: '2564',
  status: 'กำลังศึกษา',
};

// ข้อมูลผลการเรียนตัวอย่าง
const courses = [
  { code: '01418111', name: 'Introduction to Computer Science', credits: 3, grade: 'A', gradePoint: 4.0 },
  { code: '01418112', name: 'Fundamental Programming Concepts', credits: 3, grade: 'A', gradePoint: 4.0 },
  { code: '01418113', name: 'Computer Programming', credits: 3, grade: 'B+', gradePoint: 3.5 },
  { code: '01418211', name: 'Software Construction', credits: 3, grade: 'A', gradePoint: 4.0 },
  { code: '01418221', name: 'Fundamentals of Database Systems', credits: 3, grade: 'B+', gradePoint: 3.5 },
  { code: '01418231', name: 'Data Structures', credits: 3, grade: 'A', gradePoint: 4.0 },
  { code: '01418232', name: 'Algorithm Design and Analysis', credits: 3, grade: 'B', gradePoint: 3.0 },
  { code: '01418321', name: 'System Analysis and Design', credits: 3, grade: 'A', gradePoint: 4.0 },
  { code: '01418331', name: 'Operating Systems', credits: 3, grade: 'B+', gradePoint: 3.5 },
  { code: '01418341', name: 'Intellectual Properties and Professional Ethics', credits: 3, grade: 'A', gradePoint: 4.0 },
];

// คำนวณ GPA
const calculateGPA = () => {
  const totalCredits = courses.reduce((sum, c) => sum + c.credits, 0);
  const totalPoints = courses.reduce((sum, c) => sum + c.credits * c.gradePoint, 0);
  return (totalPoints / totalCredits).toFixed(2);
};

export default function TranscriptReportPage() {
  const totalCredits = courses.reduce((sum, c) => sum + c.credits, 0);
  const gpa = calculateGPA();

  return (
    <main className={style.main}>
      {/* Header มหาวิทยาลัย */}
      <div className={style.header}>
        <div className={style.logo}>🎓</div>
        <div className={style.universityInfo}>
          <h1>มหาวิทยาลัยเอไอพี</h1>
          <h2>AIP UNIVERSITY</h2>
          <p>ใบแสดงผลการศึกษา (Transcript)</p>
        </div>
      </div>

      <hr className={style.divider} />

      {/* ข้อมูลนักศึกษา */}
      <section className={style.studentSection}>
        <h3>ข้อมูลนักศึกษา</h3>
        <div className={style.studentGrid}>
          <div className={style.infoRow}>
            <span className={style.label}>รหัสนักศึกษา:</span>
            <span>{studentInfo.studentId}</span>
          </div>
          <div className={style.infoRow}>
            <span className={style.label}>ชื่อ-นามสกุล:</span>
            <span>{studentInfo.nameTh}</span>
          </div>
          <div className={style.infoRow}>
            <span className={style.label}>Name:</span>
            <span>{studentInfo.nameEn}</span>
          </div>
          <div className={style.infoRow}>
            <span className={style.label}>คณะ:</span>
            <span>{studentInfo.faculty}</span>
          </div>
          <div className={style.infoRow}>
            <span className={style.label}>ภาควิชา:</span>
            <span>{studentInfo.department}</span>
          </div>
          <div className={style.infoRow}>
            <span className={style.label}>หลักสูตร:</span>
            <span>{studentInfo.program}</span>
          </div>
          <div className={style.infoRow}>
            <span className={style.label}>ปีการศึกษาที่เข้า:</span>
            <span>{studentInfo.admissionYear}</span>
          </div>
          <div className={style.infoRow}>
            <span className={style.label}>สถานภาพ:</span>
            <span className={style.statusActive}>{studentInfo.status}</span>
          </div>
        </div>
      </section>

      {/* ตารางผลการเรียน */}
      <section className={style.gradesSection}>
        <h3>ผลการศึกษา (Academic Records)</h3>
        <table className={style.gradeTable}>
          <thead>
            <tr>
              <th>รหัสวิชา</th>
              <th>ชื่อวิชา</th>
              <th>หน่วยกิต</th>
              <th>เกรด</th>
              <th>แต้มระดับ</th>
            </tr>
          </thead>
          <tbody>
            {courses.map((course, index) => (
              <tr key={index}>
                <td>{course.code}</td>
                <td>{course.name}</td>
                <td className={style.center}>{course.credits}</td>
                <td className={style.center}>{course.grade}</td>
                <td className={style.center}>{course.gradePoint.toFixed(1)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      {/* สรุปผลการเรียน */}
      <section className={style.summarySection}>
        <h3>สรุปผลการศึกษา (Academic Summary)</h3>
        <div className={style.summaryGrid}>
          <div className={style.summaryCard}>
            <span className={style.summaryLabel}>หน่วยกิตสะสม</span>
            <span className={style.summaryValue}>{totalCredits}</span>
          </div>
          <div className={style.summaryCard}>
            <span className={style.summaryLabel}>เกรดเฉลี่ยสะสม (GPAX)</span>
            <span className={style.summaryValueLarge}>{gpa}</span>
          </div>
          <div className={style.summaryCard}>
            <span className={style.summaryLabel}>จำนวนวิชา</span>
            <span className={style.summaryValue}>{courses.length}</span>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className={style.footer}>
        <p>วันที่ออกเอกสาร: {new Date().toLocaleDateString('th-TH', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
        <p className={style.note}>เอกสารนี้ออกโดยระบบสารสนเทศนักศึกษา มหาวิทยาลัยเอไอพี</p>
        <div className={style.signatureArea}>
          <div className={style.signature}>
            <div className={style.signatureLine}></div>
            <p>นายทะเบียน</p>
          </div>
        </div>
      </footer>
    </main>
  );
}
