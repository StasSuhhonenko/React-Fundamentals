function App() {
  return (
    <div className="card">
      <Avatar />
      <div className="data">
        <Intro />
        {/* Should contain one Skill component
        for each web dev skill that you have,
        customized with props */}
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
      <Skill skillName="Vanilla JS" emoji="💪" backgroundColor="orange" />
      <Skill skillName="TypeScript" emoji="💪" backgroundColor="red" />
      <Skill skillName="React" emoji="💪" backgroundColor="blue" />
      <Skill skillName="Web Design" emoji="💪" backgroundColor="cyan" />
      <Skill skillName="Git" emoji="💪" backgroundColor="green" />
      <Skill skillName="Jira/Confluence" emoji="💪" backgroundColor="yellow" />
    </div>
  );
}
type SkillProps = {
  skillName: string;
  emoji: string;
  backgroundColor: string;
};
function Skill(props: SkillProps) {
  return (
    <div className="skill" style={{ backgroundColor: props.backgroundColor }}>
      <span>
        {props.skillName}
        {props.emoji}
      </span>
    </div>
  );
}
export default App;
