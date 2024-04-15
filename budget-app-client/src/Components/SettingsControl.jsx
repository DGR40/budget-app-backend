import { text } from "@fortawesome/fontawesome-svg-core";
import authStore from "../Store/authStore";

export default function SettingsControl({
  label,
  type,
  name,
  value,
  fieldValid,
  errorMessage,
}) {
  const aStore = authStore();

  return (
    <div className="settings__control">
      <label className={`settings__label`}>{label}</label>
      <input
        type={type}
        name={name}
        value={value || ""}
        maxLength={30}
        onChange={(e) => {
          aStore.updateUserForm(e);
        }}
        min="0.01"
        step="0.01"
        className={`settings__input ${!fieldValid && "invalid"}`}
      />
      {!fieldValid && <label className="error-text">{errorMessage}</label>}
    </div>
  );
}
