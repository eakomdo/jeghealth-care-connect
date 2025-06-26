
import * as React from "react"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"

interface Country {
  name: string;
  code: string;
  flag: string;
  dialCode: string;
}

const countries: Country[] = [
  { name: "United States", code: "US", flag: "🇺🇸", dialCode: "+1" },
  { name: "United Kingdom", code: "GB", flag: "🇬🇧", dialCode: "+44" },
  { name: "Canada", code: "CA", flag: "🇨🇦", dialCode: "+1" },
  { name: "Australia", code: "AU", flag: "🇦🇺", dialCode: "+61" },
  { name: "Germany", code: "DE", flag: "🇩🇪", dialCode: "+49" },
  { name: "France", code: "FR", flag: "🇫🇷", dialCode: "+33" },
  { name: "Italy", code: "IT", flag: "🇮🇹", dialCode: "+39" },
  { name: "Spain", code: "ES", flag: "🇪🇸", dialCode: "+34" },
  { name: "Netherlands", code: "NL", flag: "🇳🇱", dialCode: "+31" },
  { name: "Japan", code: "JP", flag: "🇯🇵", dialCode: "+81" },
  { name: "South Korea", code: "KR", flag: "🇰🇷", dialCode: "+82" },
  { name: "China", code: "CN", flag: "🇨🇳", dialCode: "+86" },
  { name: "India", code: "IN", flag: "🇮🇳", dialCode: "+91" },
  { name: "Brazil", code: "BR", flag: "🇧🇷", dialCode: "+55" },
  { name: "Mexico", code: "MX", flag: "🇲🇽", dialCode: "+52" },
  { name: "Nigeria", code: "NG", flag: "🇳🇬", dialCode: "+234" },
  { name: "South Africa", code: "ZA", flag: "🇿🇦", dialCode: "+27" },
];

interface PhoneInputProps extends Omit<React.ComponentProps<"input">, 'onChange'> {
  value?: string;
  onChange?: (value: string) => void;
  defaultCountry?: string;
}

const PhoneInput = React.forwardRef<HTMLInputElement, PhoneInputProps>(
  ({ className, value = "", onChange, defaultCountry = "US", ...props }, ref) => {
    const [selectedCountry, setSelectedCountry] = React.useState<Country>(
      countries.find(c => c.code === defaultCountry) || countries[0]
    );
    const [phoneNumber, setPhoneNumber] = React.useState("");
    const [isDropdownOpen, setIsDropdownOpen] = React.useState(false);

    React.useEffect(() => {
      if (value && value.startsWith('+')) {
        // Parse existing value
        const matchedCountry = countries.find(c => value.startsWith(c.dialCode));
        if (matchedCountry) {
          setSelectedCountry(matchedCountry);
          setPhoneNumber(value.substring(matchedCountry.dialCode.length).trim());
        }
      }
    }, [value]);

    const handleCountrySelect = (country: Country) => {
      setSelectedCountry(country);
      setIsDropdownOpen(false);
      const fullNumber = `${country.dialCode} ${phoneNumber}`.trim();
      onChange?.(fullNumber);
    };

    const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const newPhoneNumber = e.target.value;
      setPhoneNumber(newPhoneNumber);
      const fullNumber = `${selectedCountry.dialCode} ${newPhoneNumber}`.trim();
      onChange?.(fullNumber);
    };

    return (
      <div className="relative flex">
        {/* Country Code Dropdown */}
        <div className="relative">
          <button
            type="button"
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            className="flex items-center gap-2 px-3 py-2 border border-r-0 border-gray-300 rounded-l-md bg-gray-50 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
          >
            <span className="text-lg">{selectedCountry.flag}</span>
            <span className="text-sm font-medium text-gray-700">{selectedCountry.dialCode}</span>
            <svg
              className={cn("w-4 h-4 text-gray-400 transition-transform", isDropdownOpen && "rotate-180")}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>

          {/* Dropdown */}
          {isDropdownOpen && (
            <div className="absolute top-full left-0 z-50 w-72 mt-1 bg-white border border-gray-300 rounded-md shadow-lg max-h-60 overflow-y-auto">
              {countries.map((country) => (
                <button
                  key={country.code}
                  type="button"
                  onClick={() => handleCountrySelect(country)}
                  className="w-full flex items-center gap-3 px-4 py-2 text-left hover:bg-gray-50 focus:bg-gray-50 focus:outline-none"
                >
                  <span className="text-lg">{country.flag}</span>
                  <span className="text-sm font-medium text-gray-700">{country.dialCode}</span>
                  <span className="text-sm text-gray-600 truncate">{country.name}</span>
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Phone Number Input */}
        <Input
          ref={ref}
          type="tel"
          value={phoneNumber}
          onChange={handlePhoneChange}
          className={cn(
            "rounded-l-none border-l-0 focus:ring-green-500 focus:border-green-500",
            className
          )}
          {...props}
        />

        {/* Overlay to close dropdown when clicking outside */}
        {isDropdownOpen && (
          <div
            className="fixed inset-0 z-40"
            onClick={() => setIsDropdownOpen(false)}
          />
        )}
      </div>
    );
  }
);

PhoneInput.displayName = "PhoneInput";

export { PhoneInput };
