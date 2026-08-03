import { skills } from "./data.ts";

const skillsArr = skills;

function App() {
  return (
    <div className="card">
      <Avatar />
      <div className="data">
        <Intro />
        <SkillList />
      </div>
    </div>
  );
}

function Avatar() {
  return (
    <div>
      <img className="avatar" src="IMG_5488.JPG" alt="Stanislav Suhhoneko" />
    </div>
  );
}

function Intro() {
  return (
    <div>
      <h1> Stanislav Suhhonenko</h1>
      <p>
        Aspiring Frontend Web Developer, learning to build modern and complex
        apps and websites using React and TS.
      </p>
    </div>
  );
}

function SkillList() {
  return (
    <div className="skill-list">
      {skillsArr.map((skill) => (
        <Skill
          skillName={skill.skill}
          level={skill.level}
          color={skill.color}
        />
      ))}
    </div>
  );
}
type SkillProps = {
  skillName: string;
  level: string;
  color: string;
};
function Skill({ color, skillName, level }: SkillProps) {
  return (
    <div className="skill" style={{ backgroundColor: color }}>
      <span>
        {skillName}
        {level === "beginner" && "👶"}
        {level === "intermediate" && "👨"}
        {level === "advanced" && "🧔‍♂️"}
        {level === "proficient" && "👴"}
      </span>
    </div>
  );
}
export default App;
