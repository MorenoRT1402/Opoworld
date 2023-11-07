/* eslint-disable react/prop-types */
export default function SelectCarrer ({ avatarData, setSelectedCareer}) {

  const handleCarrerChange = (event) => {
    const newAvatarData = { ...avatarData, career: event.target.value };
    avatarData.onAvatarDataChange(newAvatarData);
    setSelectedCareer(event.target.value)
  };

  return (
    <select
      id="career"
      name="carrera"
      onChange={handleCarrerChange}
      value={avatarData.career}
    >
      <option value="Educación Primaria">Educación Primaria</option>
      <option value="Medicina">Medicina</option>
    </select>
  );
}