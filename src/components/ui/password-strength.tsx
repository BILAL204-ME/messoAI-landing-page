import { useState, useEffect } from "react";
import { Eye, EyeOff, Check, X } from "lucide-react";

interface PasswordStrengthIndicatorProps {
  password: string;
  onRequirementMet?: (requirement: string, met: boolean) => void;
}

interface Requirement {
  regex: RegExp;
  text: string;
  met: boolean;
}

export const PasswordStrengthIndicator = ({ password, onRequirementMet }: PasswordStrengthIndicatorProps) => {
  const [isVisible, setIsVisible] = useState(false);
  const [requirements, setRequirements] = useState<Requirement[]>([
    { regex: /.{6,}/, text: "At least 6 characters", met: false },
    { regex: /[a-z]/, text: "One lowercase letter", met: false },
    { regex: /[A-Z]/, text: "One uppercase letter", met: false },
    { regex: /\d/, text: "One number", met: false },
  ]);

  useEffect(() => {
    const updatedRequirements = requirements.map(req => ({
      ...req,
      met: req.regex.test(password)
    }));
    setRequirements(updatedRequirements);
    
    updatedRequirements.forEach(req => {
      onRequirementMet?.(req.text, req.met);
    });
  }, [password]);

  const getStrength = () => {
    const metCount = requirements.filter(req => req.met).length;
    const percentage = (metCount / requirements.length) * 100;
    
    if (percentage === 100) return { color: 'bg-green-500', text: 'Strong' };
    if (percentage >= 75) return { color: 'bg-yellow-500', text: 'Good' };
    if (percentage >= 50) return { color: 'bg-orange-500', text: 'Fair' };
    return { color: 'bg-red-500', text: 'Weak' };
  };

  const strength = getStrength();
  const allMet = requirements.every(req => req.met);

  return (
    <div className="space-y-2">
      <div className="flex items-center gap-2">
        <div className="flex-1 bg-gray-200 rounded-full h-2">
          <div 
            className={`h-2 rounded-full transition-all duration-300 ${strength.color}`}
            style={{ width: `${(requirements.filter(req => req.met).length / requirements.length) * 100}%` }}
          />
        </div>
        <span className="text-sm font-medium">{strength.text}</span>
        <button
          type="button"
          onClick={() => setIsVisible(!isVisible)}
          className="text-gray-400 hover:text-gray-600"
        >
          {isVisible ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
        </button>
      </div>
      
      {isVisible && (
        <div className="space-y-1 p-3 bg-gray-50 rounded-md border">
          {requirements.map((req, index) => (
            <div key={index} className="flex items-center gap-2 text-sm">
              {req.met ? (
                <Check className="h-4 w-4 text-green-600" />
              ) : (
                <X className="h-4 w-4 text-red-600" />
              )}
              <span className={req.met ? 'text-green-600' : 'text-red-600'}>
                {req.text}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
