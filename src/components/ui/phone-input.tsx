
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
  { name: "Afghanistan", code: "AF", flag: "🇦🇫", dialCode: "+93" },
  { name: "Albania", code: "AL", flag: "🇦🇱", dialCode: "+355" },
  { name: "Algeria", code: "DZ", flag: "🇩🇿", dialCode: "+213" },
  { name: "American Samoa", code: "AS", flag: "🇦🇸", dialCode: "+1684" },
  { name: "Andorra", code: "AD", flag: "🇦🇩", dialCode: "+376" },
  { name: "Angola", code: "AO", flag: "🇦🇴", dialCode: "+244" },
  { name: "Anguilla", code: "AI", flag: "🇦🇮", dialCode: "+1264" },
  { name: "Antarctica", code: "AQ", flag: "🇦🇶", dialCode: "+672" },
  { name: "Antigua and Barbuda", code: "AG", flag: "🇦🇬", dialCode: "+1268" },
  { name: "Argentina", code: "AR", flag: "🇦🇷", dialCode: "+54" },
  { name: "Armenia", code: "AM", flag: "🇦🇲", dialCode: "+374" },
  { name: "Aruba", code: "AW", flag: "🇦🇼", dialCode: "+297" },
  { name: "Australia", code: "AU", flag: "🇦🇺", dialCode: "+61" },
  { name: "Austria", code: "AT", flag: "🇦🇹", dialCode: "+43" },
  { name: "Azerbaijan", code: "AZ", flag: "🇦🇿", dialCode: "+994" },
  { name: "Bahamas", code: "BS", flag: "🇧🇸", dialCode: "+1242" },
  { name: "Bahrain", code: "BH", flag: "🇧🇭", dialCode: "+973" },
  { name: "Bangladesh", code: "BD", flag: "🇧🇩", dialCode: "+880" },
  { name: "Barbados", code: "BB", flag: "🇧🇧", dialCode: "+1246" },
  { name: "Belarus", code: "BY", flag: "🇧🇾", dialCode: "+375" },
  { name: "Belgium", code: "BE", flag: "🇧🇪", dialCode: "+32" },
  { name: "Belize", code: "BZ", flag: "🇧🇿", dialCode: "+501" },
  { name: "Benin", code: "BJ", flag: "🇧🇯", dialCode: "+229" },
  { name: "Bermuda", code: "BM", flag: "🇧🇲", dialCode: "+1441" },
  { name: "Bhutan", code: "BT", flag: "🇧🇹", dialCode: "+975" },
  { name: "Bolivia", code: "BO", flag: "🇧🇴", dialCode: "+591" },
  { name: "Bosnia and Herzegovina", code: "BA", flag: "🇧🇦", dialCode: "+387" },
  { name: "Botswana", code: "BW", flag: "🇧🇼", dialCode: "+267" },
  { name: "Brazil", code: "BR", flag: "🇧🇷", dialCode: "+55" },
  { name: "British Indian Ocean Territory", code: "IO", flag: "🇮🇴", dialCode: "+246" },
  { name: "Brunei Darussalam", code: "BN", flag: "🇧🇳", dialCode: "+673" },
  { name: "Bulgaria", code: "BG", flag: "🇧🇬", dialCode: "+359" },
  { name: "Burkina Faso", code: "BF", flag: "🇧🇫", dialCode: "+226" },
  { name: "Burundi", code: "BI", flag: "🇧🇮", dialCode: "+257" },
  { name: "Cambodia", code: "KH", flag: "🇰🇭", dialCode: "+855" },
  { name: "Cameroon", code: "CM", flag: "🇨🇲", dialCode: "+237" },
  { name: "Canada", code: "CA", flag: "🇨🇦", dialCode: "+1" },
  { name: "Cape Verde", code: "CV", flag: "🇨🇻", dialCode: "+238" },
  { name: "Cayman Islands", code: "KY", flag: "🇰🇾", dialCode: "+1345" },
  { name: "Central African Republic", code: "CF", flag: "🇨🇫", dialCode: "+236" },
  { name: "Chad", code: "TD", flag: "🇹🇩", dialCode: "+235" },
  { name: "Chile", code: "CL", flag: "🇨🇱", dialCode: "+56" },
  { name: "China", code: "CN", flag: "🇨🇳", dialCode: "+86" },
  { name: "Christmas Island", code: "CX", flag: "🇨🇽", dialCode: "+61" },
  { name: "Cocos Islands", code: "CC", flag: "🇨🇨", dialCode: "+61" },
  { name: "Colombia", code: "CO", flag: "🇨🇴", dialCode: "+57" },
  { name: "Comoros", code: "KM", flag: "🇰🇲", dialCode: "+269" },
  { name: "Congo", code: "CG", flag: "🇨🇬", dialCode: "+242" },
  { name: "Congo, Democratic Republic", code: "CD", flag: "🇨🇩", dialCode: "+243" },
  { name: "Cook Islands", code: "CK", flag: "🇨🇰", dialCode: "+682" },
  { name: "Costa Rica", code: "CR", flag: "🇨🇷", dialCode: "+506" },
  { name: "Croatia", code: "HR", flag: "🇭🇷", dialCode: "+385" },
  { name: "Cuba", code: "CU", flag: "🇨🇺", dialCode: "+53" },
  { name: "Cyprus", code: "CY", flag: "🇨🇾", dialCode: "+357" },
  { name: "Czech Republic", code: "CZ", flag: "🇨🇿", dialCode: "+420" },
  { name: "Denmark", code: "DK", flag: "🇩🇰", dialCode: "+45" },
  { name: "Djibouti", code: "DJ", flag: "🇩🇯", dialCode: "+253" },
  { name: "Dominica", code: "DM", flag: "🇩🇲", dialCode: "+1767" },
  { name: "Dominican Republic", code: "DO", flag: "🇩🇴", dialCode: "+1849" },
  { name: "Ecuador", code: "EC", flag: "🇪🇨", dialCode: "+593" },
  { name: "Egypt", code: "EG", flag: "🇪🇬", dialCode: "+20" },
  { name: "El Salvador", code: "SV", flag: "🇸🇻", dialCode: "+503" },
  { name: "Equatorial Guinea", code: "GQ", flag: "🇬🇶", dialCode: "+240" },
  { name: "Eritrea", code: "ER", flag: "🇪🇷", dialCode: "+291" },
  { name: "Estonia", code: "EE", flag: "🇪🇪", dialCode: "+372" },
  { name: "Ethiopia", code: "ET", flag: "🇪🇹", dialCode: "+251" },
  { name: "Falkland Islands", code: "FK", flag: "🇫🇰", dialCode: "+500" },
  { name: "Faroe Islands", code: "FO", flag: "🇫🇴", dialCode: "+298" },
  { name: "Fiji", code: "FJ", flag: "🇫🇯", dialCode: "+679" },
  { name: "Finland", code: "FI", flag: "🇫🇮", dialCode: "+358" },
  { name: "France", code: "FR", flag: "🇫🇷", dialCode: "+33" },
  { name: "French Guiana", code: "GF", flag: "🇬🇫", dialCode: "+594" },
  { name: "French Polynesia", code: "PF", flag: "🇵🇫", dialCode: "+689" },
  { name: "Gabon", code: "GA", flag: "🇬🇦", dialCode: "+241" },
  { name: "Gambia", code: "GM", flag: "🇬🇲", dialCode: "+220" },
  { name: "Georgia", code: "GE", flag: "🇬🇪", dialCode: "+995" },
  { name: "Germany", code: "DE", flag: "🇩🇪", dialCode: "+49" },
  { name: "Ghana", code: "GH", flag: "🇬🇭", dialCode: "+233" },
  { name: "Gibraltar", code: "GI", flag: "🇬🇮", dialCode: "+350" },
  { name: "Greece", code: "GR", flag: "🇬🇷", dialCode: "+30" },
  { name: "Greenland", code: "GL", flag: "🇬🇱", dialCode: "+299" },
  { name: "Grenada", code: "GD", flag: "🇬🇩", dialCode: "+1473" },
  { name: "Guadeloupe", code: "GP", flag: "🇬🇵", dialCode: "+590" },
  { name: "Guam", code: "GU", flag: "🇬🇺", dialCode: "+1671" },
  { name: "Guatemala", code: "GT", flag: "🇬🇹", dialCode: "+502" },
  { name: "Guernsey", code: "GG", flag: "🇬🇬", dialCode: "+44" },
  { name: "Guinea", code: "GN", flag: "🇬🇳", dialCode: "+224" },
  { name: "Guinea-Bissau", code: "GW", flag: "🇬🇼", dialCode: "+245" },
  { name: "Guyana", code: "GY", flag: "🇬🇾", dialCode: "+592" },
  { name: "Haiti", code: "HT", flag: "🇭🇹", dialCode: "+509" },
  { name: "Honduras", code: "HN", flag: "🇭🇳", dialCode: "+504" },
  { name: "Hong Kong", code: "HK", flag: "🇭🇰", dialCode: "+852" },
  { name: "Hungary", code: "HU", flag: "🇭🇺", dialCode: "+36" },
  { name: "Iceland", code: "IS", flag: "🇮🇸", dialCode: "+354" },
  { name: "India", code: "IN", flag: "🇮🇳", dialCode: "+91" },
  { name: "Indonesia", code: "ID", flag: "🇮🇩", dialCode: "+62" },
  { name: "Iran", code: "IR", flag: "🇮🇷", dialCode: "+98" },
  { name: "Iraq", code: "IQ", flag: "🇮🇶", dialCode: "+964" },
  { name: "Ireland", code: "IE", flag: "🇮🇪", dialCode: "+353" },
  { name: "Isle of Man", code: "IM", flag: "🇮🇲", dialCode: "+44" },
  { name: "Israel", code: "IL", flag: "🇮🇱", dialCode: "+972" },
  { name: "Italy", code: "IT", flag: "🇮🇹", dialCode: "+39" },
  { name: "Ivory Coast", code: "CI", flag: "🇨🇮", dialCode: "+225" },
  { name: "Jamaica", code: "JM", flag: "🇯🇲", dialCode: "+1876" },
  { name: "Japan", code: "JP", flag: "🇯🇵", dialCode: "+81" },
  { name: "Jersey", code: "JE", flag: "🇯🇪", dialCode: "+44" },
  { name: "Jordan", code: "JO", flag: "🇯🇴", dialCode: "+962" },
  { name: "Kazakhstan", code: "KZ", flag: "🇰🇿", dialCode: "+7" },
  { name: "Kenya", code: "KE", flag: "🇰🇪", dialCode: "+254" },
  { name: "Kiribati", code: "KI", flag: "🇰🇮", dialCode: "+686" },
  { name: "Kuwait", code: "KW", flag: "🇰🇼", dialCode: "+965" },
  { name: "Kyrgyzstan", code: "KG", flag: "🇰🇬", dialCode: "+996" },
  { name: "Laos", code: "LA", flag: "🇱🇦", dialCode: "+856" },
  { name: "Latvia", code: "LV", flag: "🇱🇻", dialCode: "+371" },
  { name: "Lebanon", code: "LB", flag: "🇱🇧", dialCode: "+961" },
  { name: "Lesotho", code: "LS", flag: "🇱🇸", dialCode: "+266" },
  { name: "Liberia", code: "LR", flag: "🇱🇷", dialCode: "+231" },
  { name: "Libya", code: "LY", flag: "🇱🇾", dialCode: "+218" },
  { name: "Liechtenstein", code: "LI", flag: "🇱🇮", dialCode: "+423" },
  { name: "Lithuania", code: "LT", flag: "🇱🇹", dialCode: "+370" },
  { name: "Luxembourg", code: "LU", flag: "🇱🇺", dialCode: "+352" },
  { name: "Macao", code: "MO", flag: "🇲🇴", dialCode: "+853" },
  { name: "Macedonia", code: "MK", flag: "🇲🇰", dialCode: "+389" },
  { name: "Madagascar", code: "MG", flag: "🇲🇬", dialCode: "+261" },
  { name: "Malawi", code: "MW", flag: "🇲🇼", dialCode: "+265" },
  { name: "Malaysia", code: "MY", flag: "🇲🇾", dialCode: "+60" },
  { name: "Maldives", code: "MV", flag: "🇲🇻", dialCode: "+960" },
  { name: "Mali", code: "ML", flag: "🇲🇱", dialCode: "+223" },
  { name: "Malta", code: "MT", flag: "🇲🇹", dialCode: "+356" },
  { name: "Marshall Islands", code: "MH", flag: "🇲🇭", dialCode: "+692" },
  { name: "Martinique", code: "MQ", flag: "🇲🇶", dialCode: "+596" },
  { name: "Mauritania", code: "MR", flag: "🇲🇷", dialCode: "+222" },
  { name: "Mauritius", code: "MU", flag: "🇲🇺", dialCode: "+230" },
  { name: "Mayotte", code: "YT", flag: "🇾🇹", dialCode: "+262" },
  { name: "Mexico", code: "MX", flag: "🇲🇽", dialCode: "+52" },
  { name: "Micronesia", code: "FM", flag: "🇫🇲", dialCode: "+691" },
  { name: "Moldova", code: "MD", flag: "🇲🇩", dialCode: "+373" },
  { name: "Monaco", code: "MC", flag: "🇲🇨", dialCode: "+377" },
  { name: "Mongolia", code: "MN", flag: "🇲🇳", dialCode: "+976" },
  { name: "Montenegro", code: "ME", flag: "🇲🇪", dialCode: "+382" },
  { name: "Montserrat", code: "MS", flag: "🇲🇸", dialCode: "+1664" },
  { name: "Morocco", code: "MA", flag: "🇲🇦", dialCode: "+212" },
  { name: "Mozambique", code: "MZ", flag: "🇲🇿", dialCode: "+258" },
  { name: "Myanmar", code: "MM", flag: "🇲🇲", dialCode: "+95" },
  { name: "Namibia", code: "NA", flag: "🇳🇦", dialCode: "+264" },
  { name: "Nauru", code: "NR", flag: "🇳🇷", dialCode: "+674" },
  { name: "Nepal", code: "NP", flag: "🇳🇵", dialCode: "+977" },
  { name: "Netherlands", code: "NL", flag: "🇳🇱", dialCode: "+31" },
  { name: "Netherlands Antilles", code: "AN", flag: "🇦🇳", dialCode: "+599" },
  { name: "New Caledonia", code: "NC", flag: "🇳🇨", dialCode: "+687" },
  { name: "New Zealand", code: "NZ", flag: "🇳🇿", dialCode: "+64" },
  { name: "Nicaragua", code: "NI", flag: "🇳🇮", dialCode: "+505" },
  { name: "Niger", code: "NE", flag: "🇳🇪", dialCode: "+227" },
  { name: "Nigeria", code: "NG", flag: "🇳🇬", dialCode: "+234" },
  { name: "Niue", code: "NU", flag: "🇳🇺", dialCode: "+683" },
  { name: "Norfolk Island", code: "NF", flag: "🇳🇫", dialCode: "+672" },
  { name: "North Korea", code: "KP", flag: "🇰🇵", dialCode: "+850" },
  { name: "Northern Mariana Islands", code: "MP", flag: "🇲🇵", dialCode: "+1670" },
  { name: "Norway", code: "NO", flag: "🇳🇴", dialCode: "+47" },
  { name: "Oman", code: "OM", flag: "🇴🇲", dialCode: "+968" },
  { name: "Pakistan", code: "PK", flag: "🇵🇰", dialCode: "+92" },
  { name: "Palau", code: "PW", flag: "🇵🇼", dialCode: "+680" },
  { name: "Palestine", code: "PS", flag: "🇵🇸", dialCode: "+970" },
  { name: "Panama", code: "PA", flag: "🇵🇦", dialCode: "+507" },
  { name: "Papua New Guinea", code: "PG", flag: "🇵🇬", dialCode: "+675" },
  { name: "Paraguay", code: "PY", flag: "🇵🇾", dialCode: "+595" },
  { name: "Peru", code: "PE", flag: "🇵🇪", dialCode: "+51" },
  { name: "Philippines", code: "PH", flag: "🇵🇭", dialCode: "+63" },
  { name: "Pitcairn", code: "PN", flag: "🇵🇳", dialCode: "+64" },
  { name: "Poland", code: "PL", flag: "🇵🇱", dialCode: "+48" },
  { name: "Portugal", code: "PT", flag: "🇵🇹", dialCode: "+351" },
  { name: "Puerto Rico", code: "PR", flag: "🇵🇷", dialCode: "+1787" },
  { name: "Qatar", code: "QA", flag: "🇶🇦", dialCode: "+974" },
  { name: "Reunion", code: "RE", flag: "🇷🇪", dialCode: "+262" },
  { name: "Romania", code: "RO", flag: "🇷🇴", dialCode: "+40" },
  { name: "Russia", code: "RU", flag: "🇷🇺", dialCode: "+7" },
  { name: "Rwanda", code: "RW", flag: "🇷🇼", dialCode: "+250" },
  { name: "Saint Barthelemy", code: "BL", flag: "🇧🇱", dialCode: "+590" },
  { name: "Saint Helena", code: "SH", flag: "🇸🇭", dialCode: "+290" },
  { name: "Saint Kitts and Nevis", code: "KN", flag: "🇰🇳", dialCode: "+1869" },
  { name: "Saint Lucia", code: "LC", flag: "🇱🇨", dialCode: "+1758" },
  { name: "Saint Martin", code: "MF", flag: "🇲🇫", dialCode: "+590" },
  { name: "Saint Pierre and Miquelon", code: "PM", flag: "🇵🇲", dialCode: "+508" },
  { name: "Saint Vincent and the Grenadines", code: "VC", flag: "🇻🇨", dialCode: "+1784" },
  { name: "Samoa", code: "WS", flag: "🇼🇸", dialCode: "+685" },
  { name: "San Marino", code: "SM", flag: "🇸🇲", dialCode: "+378" },
  { name: "Sao Tome and Principe", code: "ST", flag: "🇸🇹", dialCode: "+239" },
  { name: "Saudi Arabia", code: "SA", flag: "🇸🇦", dialCode: "+966" },
  { name: "Senegal", code: "SN", flag: "🇸🇳", dialCode: "+221" },
  { name: "Serbia", code: "RS", flag: "🇷🇸", dialCode: "+381" },
  { name: "Seychelles", code: "SC", flag: "🇸🇨", dialCode: "+248" },
  { name: "Sierra Leone", code: "SL", flag: "🇸🇱", dialCode: "+232" },
  { name: "Singapore", code: "SG", flag: "🇸🇬", dialCode: "+65" },
  { name: "Slovakia", code: "SK", flag: "🇸🇰", dialCode: "+421" },
  { name: "Slovenia", code: "SI", flag: "🇸🇮", dialCode: "+386" },
  { name: "Solomon Islands", code: "SB", flag: "🇸🇧", dialCode: "+677" },
  { name: "Somalia", code: "SO", flag: "🇸🇴", dialCode: "+252" },
  { name: "South Africa", code: "ZA", flag: "🇿🇦", dialCode: "+27" },
  { name: "South Georgia and the South Sandwich Islands", code: "GS", flag: "🇬🇸", dialCode: "+500" },
  { name: "South Korea", code: "KR", flag: "🇰🇷", dialCode: "+82" },
  { name: "Spain", code: "ES", flag: "🇪🇸", dialCode: "+34" },
  { name: "Sri Lanka", code: "LK", flag: "🇱🇰", dialCode: "+94" },
  { name: "Sudan", code: "SD", flag: "🇸🇩", dialCode: "+249" },
  { name: "Suriname", code: "SR", flag: "🇸🇷", dialCode: "+597" },
  { name: "Svalbard and Jan Mayen", code: "SJ", flag: "🇸🇯", dialCode: "+47" },
  { name: "Swaziland", code: "SZ", flag: "🇸🇿", dialCode: "+268" },
  { name: "Sweden", code: "SE", flag: "🇸🇪", dialCode: "+46" },
  { name: "Switzerland", code: "CH", flag: "🇨🇭", dialCode: "+41" },
  { name: "Syria", code: "SY", flag: "🇸🇾", dialCode: "+963" },
  { name: "Taiwan", code: "TW", flag: "🇹🇼", dialCode: "+886" },
  { name: "Tajikistan", code: "TJ", flag: "🇹🇯", dialCode: "+992" },
  { name: "Tanzania", code: "TZ", flag: "🇹🇿", dialCode: "+255" },
  { name: "Thailand", code: "TH", flag: "🇹🇭", dialCode: "+66" },
  { name: "Timor-Leste", code: "TL", flag: "🇹🇱", dialCode: "+670" },
  { name: "Togo", code: "TG", flag: "🇹🇬", dialCode: "+228" },
  { name: "Tokelau", code: "TK", flag: "🇹🇰", dialCode: "+690" },
  { name: "Tonga", code: "TO", flag: "🇹🇴", dialCode: "+676" },
  { name: "Trinidad and Tobago", code: "TT", flag: "🇹🇹", dialCode: "+1868" },
  { name: "Tunisia", code: "TN", flag: "🇹🇳", dialCode: "+216" },
  { name: "Turkey", code: "TR", flag: "🇹🇷", dialCode: "+90" },
  { name: "Turkmenistan", code: "TM", flag: "🇹🇲", dialCode: "+993" },
  { name: "Turks and Caicos Islands", code: "TC", flag: "🇹🇨", dialCode: "+1649" },
  { name: "Tuvalu", code: "TV", flag: "🇹🇻", dialCode: "+688" },
  { name: "Uganda", code: "UG", flag: "🇺🇬", dialCode: "+256" },
  { name: "Ukraine", code: "UA", flag: "🇺🇦", dialCode: "+380" },
  { name: "United Arab Emirates", code: "AE", flag: "🇦🇪", dialCode: "+971" },
  { name: "United Kingdom", code: "GB", flag: "🇬🇧", dialCode: "+44" },
  { name: "United States", code: "US", flag: "🇺🇸", dialCode: "+1" },
  { name: "United States Minor Outlying Islands", code: "UM", flag: "🇺🇲", dialCode: "+1" },
  { name: "Uruguay", code: "UY", flag: "🇺🇾", dialCode: "+598" },
  { name: "Uzbekistan", code: "UZ", flag: "🇺🇿", dialCode: "+998" },
  { name: "Vanuatu", code: "VU", flag: "🇻🇺", dialCode: "+678" },
  { name: "Vatican City", code: "VA", flag: "🇻🇦", dialCode: "+39" },
  { name: "Venezuela", code: "VE", flag: "🇻🇪", dialCode: "+58" },
  { name: "Vietnam", code: "VN", flag: "🇻🇳", dialCode: "+84" },
  { name: "Virgin Islands, British", code: "VG", flag: "🇻🇬", dialCode: "+1284" },
  { name: "Virgin Islands, U.S.", code: "VI", flag: "🇻🇮", dialCode: "+1340" },
  { name: "Wallis and Futuna", code: "WF", flag: "🇼🇫", dialCode: "+681" },
  { name: "Western Sahara", code: "EH", flag: "🇪🇭", dialCode: "+212" },
  { name: "Yemen", code: "YE", flag: "🇾🇪", dialCode: "+967" },
  { name: "Zambia", code: "ZM", flag: "🇿🇲", dialCode: "+260" },
  { name: "Zimbabwe", code: "ZW", flag: "🇿🇼", dialCode: "+263" }
];

interface PhoneInputProps extends Omit<React.ComponentProps<"input">, 'onChange'> {
  value?: string;
  onChange?: (value: string) => void;
  defaultCountry?: string;
}

const PhoneInput = React.forwardRef<HTMLInputElement, PhoneInputProps>(
  ({ className, value = "", onChange, defaultCountry = "US", ...props }, ref) => {
    const [selectedCountry, setSelectedCountry] = React.useState<Country>(
      countries.find(c => c.code === defaultCountry) || countries.find(c => c.code === "US") || countries[0]
    );
    const [phoneNumber, setPhoneNumber] = React.useState("");
    const [isDropdownOpen, setIsDropdownOpen] = React.useState(false);
    const [searchTerm, setSearchTerm] = React.useState("");

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
      setSearchTerm("");
      const fullNumber = `${country.dialCode} ${phoneNumber}`.trim();
      onChange?.(fullNumber);
    };

    const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const newPhoneNumber = e.target.value;
      setPhoneNumber(newPhoneNumber);
      const fullNumber = `${selectedCountry.dialCode} ${newPhoneNumber}`.trim();
      onChange?.(fullNumber);
    };

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setSearchTerm(e.target.value);
    };

    // Filter countries based on search term
    const filteredCountries = countries.filter(country =>
      country.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      country.dialCode.includes(searchTerm) ||
      country.code.toLowerCase().includes(searchTerm.toLowerCase())
    );

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
            <div className="absolute top-full left-0 z-50 w-80 mt-1 bg-white border border-gray-300 rounded-md shadow-lg max-h-80 overflow-hidden">
              {/* Search Input */}
              <div className="p-3 border-b border-gray-200">
                <Input
                  type="text"
                  placeholder="Search countries or dial codes..."
                  value={searchTerm}
                  onChange={handleSearchChange}
                  className="w-full text-sm"
                />
              </div>
              
              {/* Countries List */}
              <div className="overflow-y-auto max-h-60">
                {filteredCountries.length > 0 ? (
                  filteredCountries.map((country) => (
                    <button
                      key={country.code}
                      type="button"
                      onClick={() => handleCountrySelect(country)}
                      className="w-full flex items-center gap-3 px-4 py-2 text-left hover:bg-gray-50 focus:bg-gray-50 focus:outline-none"
                    >
                      <span className="text-lg">{country.flag}</span>
                      <span className="text-sm font-medium text-gray-700 min-w-12">{country.dialCode}</span>
                      <span className="text-sm text-gray-600 truncate">{country.name}</span>
                    </button>
                  ))
                ) : (
                  <div className="px-4 py-3 text-sm text-gray-500 text-center">
                    No countries found
                  </div>
                )}
              </div>
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
