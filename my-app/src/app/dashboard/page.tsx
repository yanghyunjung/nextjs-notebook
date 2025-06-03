import variables from './../variables.module.scss'

export default function Dashboard() {
    return (
      <div className="flex">
        <p className="font-bold" style={{ color: variables.primaryColor }}>This is the Dashboard page.</p>
      </div>
    );
}