import { getInitials } from "../../utils/helper";

function ProfileInfo({ onLogout, userInfo }: { onLogout: any; userInfo: any }) {
  return (
    <div className="flex items-center gap-3">
      <div className="w-12 h-12 flex items-center justify-center rounded-full text-slate-950 font-medium bg-slate-100">
        {getInitials(userInfo?.name)}
      </div>
      <div>
        <p className="text-sm font-medium">{userInfo?.name}</p>
        <button className="text-sm tex-slate-700 underline" onClick={onLogout}>
          Logout
        </button>
      </div>
    </div>
  );
}

export default ProfileInfo;
