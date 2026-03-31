'use client';
import React, { useState, useMemo } from 'react';
import { Check, Eye, EyeOff, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useTranslation } from 'react-i18next';

// Constants
const PASSWORD_REQUIREMENTS = [
  { regex: /.{8,}/, text: 'At least 8 characters' },
  { regex: /[0-9]/, text: 'At least 1 number' },
  { regex: /[a-z]/, text: 'At least 1 lowercase letter' },
  { regex: /[A-Z]/, text: 'At least 1 uppercase letter' },
  { regex: /[!-\/:-@[-`{-~]/, text: 'At least 1 special character' },
] as const;

type StrengthScore = 0 | 1 | 2 | 3 | 4 | 5;

const STRENGTH_CONFIG = {
  colors: {
    0: 'bg-border',
    1: 'bg-red-500',
    2: 'bg-orange-500',
    3: 'bg-amber-500',
    4: 'bg-amber-700',
    5: 'bg-emerald-500',
  } satisfies Record<StrengthScore, string>,
  texts: {
    0: 'Enter a password',
    1: 'Weak password',
    2: 'Medium password!',
    3: 'Strong password!!',
    4: 'Very Strong password!!!',
  } satisfies Record<Exclude<StrengthScore, 5>, string>,
} as const;

// Types
type Requirement = {
  met: boolean;
  text: string;
};

type PasswordStrength = {
  score: StrengthScore;
  requirements: Requirement[];
};

interface PasswordInputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type'> {
  showStrengthIndicator?: boolean;
  onStrengthChange?: (strength: PasswordStrength) => void;
  showUnderline?: boolean;
}

const PasswordInput = React.forwardRef<HTMLInputElement, PasswordInputProps>(
  ({ className, showStrengthIndicator = true, onStrengthChange, showUnderline = true, ...props }, ref) => {
    const { t } = useTranslation();
    const [isVisible, setIsVisible] = useState(false);

    // Get translated password requirements
    const passwordRequirements = [
      { regex: /.{8,}/, text: t('password.atLeast8Chars') },
      { regex: /[0-9]/, text: t('password.atLeast1Number') },
      { regex: /[a-z]/, text: t('password.atLeast1Lowercase') },
      { regex: /[A-Z]/, text: t('password.atLeast1Uppercase') },
      { regex: /[!-\/:-@[-`{-~]/, text: t('password.atLeast1Special') },
    ];

    const strengthTexts = {
      0: t('password.enterPassword'),
      1: t('password.weakPassword'),
      2: t('password.mediumPassword'),
      3: t('password.strongPassword'),
      4: t('password.veryStrongPassword'),
    };

    const calculateStrength = useMemo((): PasswordStrength => {
      const password = String(props.value || '');
      const requirements = passwordRequirements.map((req) => ({
        met: req.regex.test(password),
        text: req.text,
      }));

      const strength = {
        score: requirements.filter((req) => req.met).length as StrengthScore,
        requirements,
      };

      // Notify parent of strength change
      if (onStrengthChange) {
        onStrengthChange(strength);
      }

      return strength;
    }, [props.value, onStrengthChange]);

    const toggleVisibility = () => setIsVisible((prev) => !prev);

    // Get underline color based on strength
    const getUnderlineColor = () => {
      if (!props.value) return 'border-zinc-900 dark:border-zinc-50';
      const score = calculateStrength.score;
      if (score <= 1) return 'border-red-500';
      if (score === 2) return 'border-orange-500';
      if (score === 3) return 'border-amber-500';
      if (score === 4) return 'border-green-500';
      return 'border-zinc-900 dark:border-zinc-50';
    };

    return (
      <div className='w-full space-y-2'>
        <div className='relative'>
          <input
            {...props}
            ref={ref}
            type={isVisible ? 'text' : 'password'}
            className={cn(
              'flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50',
              'sm:text-base sm:h-12',
              showUnderline && 'border-0 border-b-2 rounded-none bg-transparent px-0 py-2 sm:py-3 pr-10 focus-visible:ring-0 focus-visible:ring-offset-0',
              showUnderline && getUnderlineColor(),
              className
            )}
          />
          <button
            type='button'
            onClick={toggleVisibility}
            className='absolute inset-y-0 right-0 flex items-center justify-center w-10 text-muted-foreground hover:text-foreground transition-colors bg-transparent'
          >
            {isVisible ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
        </div>

        {showStrengthIndicator && props.value && (
          <>
            <div
              className='h-1 rounded-full bg-border overflow-hidden'
              role='progressbar'
              aria-valuenow={calculateStrength.score}
              aria-valuemin={0}
              aria-valuemax={4}
            >
              <div
                className={`h-full ${STRENGTH_CONFIG.colors[calculateStrength.score]} transition-all duration-500`}
                style={{ width: `${(calculateStrength.score / 5) * 100}%` }}
              />
            </div>

            <p className='mb-2 text-sm font-medium flex justify-between'>
              <span>{t('password.mustContain')}</span>
              <span>
                {
                  strengthTexts[
                    Math.min(
                      calculateStrength.score,
                      4
                    ) as keyof typeof strengthTexts
                  ]
                }
              </span>
            </p>

            <ul className='space-y-1.5' aria-label='Password requirements'>
              {calculateStrength.requirements.map((req, index) => (
                <li key={index} className='flex items-center space-x-2'>
                  {req.met ? (
                    <Check size={16} className='text-emerald-500' />
                  ) : (
                    <X size={16} className='text-muted-foreground/80' />
                  )}
                  <span
                    className={cn(
                      'text-xs',
                      req.met ? 'text-emerald-600' : 'text-muted-foreground'
                    )}
                  >
                    {req.text}
                    <span className='sr-only'>
                      {req.met ? ' - Requirement met' : ' - Requirement not met'}
                    </span>
                  </span>
                </li>
              ))}
            </ul>
          </>
        )}
      </div>
    );
  }
);

PasswordInput.displayName = 'PasswordInput';

export { PasswordInput, type PasswordInputProps, type PasswordStrength };
