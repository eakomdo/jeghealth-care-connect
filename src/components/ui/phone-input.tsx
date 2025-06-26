
import * as React from "react"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"

interface Country {
  name: string;
  code: string;
  flag: string;
  dialCode: string;
  phoneLength: number; // Expected phone number length (without country code)
}

const countries: Country[] = [
  { name: "Afghanistan", code: "AF", flag: "🇦🇫", dialCode: "+93", phoneLength: 9 },
  { name: "Albania", code: "AL", flag: "🇦🇱", dialCode: "+355", phoneLength: 9 },
  { name: "Algeria", code: "DZ", flag: "🇩🇿", dialCode: "+213", phoneLength: 9 },
  { name: "American Samoa", code: "AS", flag: "🇦🇸", dialCode: "+1684", phoneLength: 7 },
  { name: "Andorra", code: "AD", flag: "🇦🇩", dialCode: "+376", phoneLength: 6 },
  { name: "Angola", code: "AO", flag: "🇦🇴", dialCode: "+244", phoneLength: 9 },
  { name: "Anguilla", code: "AI", flag: "🇦🇮", dialCode: "+1264", phoneLength: 7 },
  { name: "Antarctica", code: "AQ", flag: "🇦🇶", dialCode: "+672", phoneLength: 6 },
  { name: "Antigua and Barbuda", code: "AG", flag: "🇦🇬", dialCode: "+1268", phoneLength: 7 },
  { name: "Argentina", code: "AR", flag: "🇦🇷", dialCode: "+54", phoneLength: 10 },
  { name: "Armenia", code: "AM", flag: "🇦🇲", dialCode: "+374", phoneLength: 8 },
  { name: "Aruba", code: "AW", flag: "🇦🇼", dialCode: "+297", phoneLength: 7 },
  { name: "Australia", code: "AU", flag: "🇦🇺", dialCode: "+61", phoneLength: 9 },
  { name: "Austria", code: "AT", flag: "🇦🇹", dialCode: "+43", phoneLength: 10 },
  { name: "Azerbaijan", code: "AZ", flag: "🇦🇿", dialCode: "+994", phoneLength: 9 },
  { name: "Bahamas", code: "BS", flag: "🇧🇸", dialCode: "+1242", phoneLength: 7 },
  { name: "Bahrain", code: "BH", flag: "🇧🇭", dialCode: "+973", phoneLength: 8 },
  { name: "Bangladesh", code: "BD", flag: "🇧🇩", dialCode: "+880", phoneLength: 10 },
  { name: "Barbados", code: "BB", flag: "🇧🇧", dialCode: "+1246", phoneLength: 7 },
  { name: "Belarus", code: "BY", flag: "🇧🇾", dialCode: "+375", phoneLength: 9 },
  { name: "Belgium", code: "BE", flag: "🇧🇪", dialCode: "+32", phoneLength: 9 },
  { name: "Belize", code: "BZ", flag: "🇧🇿", dialCode: "+501", phoneLength: 7 },
  { name: "Benin", code: "BJ", flag: "🇧🇯", dialCode: "+229", phoneLength: 8 },
  { name: "Bermuda", code: "BM", flag: "🇧🇲", dialCode: "+1441", phoneLength: 7 },
  { name: "Bhutan", code: "BT", flag: "🇧🇹", dialCode: "+975", phoneLength: 8 },
  { name: "Bolivia", code: "BO", flag: "🇧🇴", dialCode: "+591", phoneLength: 8 },
  { name: "Bosnia and Herzegovina", code: "BA", flag: "🇧🇦", dialCode: "+387", phoneLength: 8 },
  { name: "Botswana", code: "BW", flag: "🇧🇼", dialCode: "+267", phoneLength: 8 },
  { name: "Brazil", code: "BR", flag: "🇧🇷", dialCode: "+55", phoneLength: 11 },
  { name: "British Indian Ocean Territory", code: "IO", flag: "🇮🇴", dialCode: "+246", phoneLength: 7 },
  { name: "Brunei Darussalam", code: "BN", flag: "🇧🇳", dialCode: "+673", phoneLength: 7 },
  { name: "Bulgaria", code: "BG", flag: "🇧🇬", dialCode: "+359", phoneLength: 9 },
  { name: "Burkina Faso", code: "BF", flag: "🇧🇫", dialCode: "+226", phoneLength: 8 },
  { name: "Burundi", code: "BI", flag: "🇧🇮", dialCode: "+257", phoneLength: 8 },
  { name: "Cambodia", code: "KH", flag: "🇰🇭", dialCode: "+855", phoneLength: 9 },
  { name: "Cameroon", code: "CM", flag: "🇨🇲", dialCode: "+237", phoneLength: 9 },
  { name: "Canada", code: "CA", flag: "🇨🇦", dialCode: "+1", phoneLength: 10 },
  { name: "Cape Verde", code: "CV", flag: "🇨🇻", dialCode: "+238", phoneLength: 7 },
  { name: "Cayman Islands", code: "KY", flag: "🇰🇾", dialCode: "+1345", phoneLength: 7 },
  { name: "Central African Republic", code: "CF", flag: "🇨🇫", dialCode: "+236", phoneLength: 8 },
  { name: "Chad", code: "TD", flag: "🇹🇩", dialCode: "+235", phoneLength: 8 },
  { name: "Chile", code: "CL", flag: "🇨🇱", dialCode: "+56", phoneLength: 9 },
  { name: "China", code: "CN", flag: "🇨🇳", dialCode: "+86", phoneLength: 11 },
  { name: "Christmas Island", code: "CX", flag: "🇨🇽", dialCode: "+61", phoneLength: 9 },
  { name: "Cocos Islands", code: "CC", flag: "🇨🇨", dialCode: "+61", phoneLength: 9 },
  { name: "Colombia", code: "CO", flag: "🇨🇴", dialCode: "+57", phoneLength: 10 },
  { name: "Comoros", code: "KM", flag: "🇰🇲", dialCode: "+269", phoneLength: 7 },
  { name: "Congo", code: "CG", flag: "🇨🇬", dialCode: "+242", phoneLength: 9 },
  { name: "Congo, Democratic Republic", code: "CD", flag: "🇨🇩", dialCode: "+243", phoneLength: 9 },
  { name: "Cook Islands", code: "CK", flag: "🇨🇰", dialCode: "+682", phoneLength: 5 },
  { name: "Costa Rica", code: "CR", flag: "🇨🇷", dialCode: "+506", phoneLength: 8 },
  { name: "Croatia", code: "HR", flag: "🇭🇷", dialCode: "+385", phoneLength: 9 },
  { name: "Cuba", code: "CU", flag: "🇨🇺", dialCode: "+53", phoneLength: 8 },
  { name: "Cyprus", code: "CY", flag: "🇨🇾", dialCode: "+357", phoneLength: 8 },
  { name: "Czech Republic", code: "CZ", flag: "🇨🇿", dialCode: "+420", phoneLength: 9 },
  { name: "Denmark", code: "DK", flag: "🇩🇰", dialCode: "+45", phoneLength: 8 },
  { name: "Djibouti", code: "DJ", flag: "🇩🇯", dialCode: "+253", phoneLength: 8 },
  { name: "Dominica", code: "DM", flag: "🇩🇲", dialCode: "+1767", phoneLength: 7 },
  { name: "Dominican Republic", code: "DO", flag: "🇩🇴", dialCode: "+1849", phoneLength: 7 },
  { name: "Ecuador", code: "EC", flag: "🇪🇨", dialCode: "+593", phoneLength: 9 },
  { name: "Egypt", code: "EG", flag: "🇪🇬", dialCode: "+20", phoneLength: 10 },
  { name: "El Salvador", code: "SV", flag: "🇸🇻", dialCode: "+503", phoneLength: 8 },
  { name: "Equatorial Guinea", code: "GQ", flag: "🇬🇶", dialCode: "+240", phoneLength: 9 },
  { name: "Eritrea", code: "ER", flag: "🇪🇷", dialCode: "+291", phoneLength: 7 },
  { name: "Estonia", code: "EE", flag: "🇪🇪", dialCode: "+372", phoneLength: 8 },
  { name: "Ethiopia", code: "ET", flag: "🇪🇹", dialCode: "+251", phoneLength: 9 },
  { name: "Falkland Islands", code: "FK", flag: "🇫🇰", dialCode: "+500", phoneLength: 5 },
  { name: "Faroe Islands", code: "FO", flag: "🇫🇴", dialCode: "+298", phoneLength: 6 },
  { name: "Fiji", code: "FJ", flag: "🇫🇯", dialCode: "+679", phoneLength: 7 },
  { name: "Finland", code: "FI", flag: "🇫🇮", dialCode: "+358", phoneLength: 9 },
  { name: "France", code: "FR", flag: "🇫🇷", dialCode: "+33", phoneLength: 10 },
  { name: "French Guiana", code: "GF", flag: "🇬🇫", dialCode: "+594", phoneLength: 9 },
  { name: "French Polynesia", code: "PF", flag: "🇵🇫", dialCode: "+689", phoneLength: 8 },
  { name: "Gabon", code: "GA", flag: "🇬🇦", dialCode: "+241", phoneLength: 8 },
  { name: "Gambia", code: "GM", flag: "🇬🇲", dialCode: "+220", phoneLength: 7 },
  { name: "Georgia", code: "GE", flag: "🇬🇪", dialCode: "+995", phoneLength: 9 },
  { name: "Germany", code: "DE", flag: "🇩🇪", dialCode: "+49", phoneLength: 11 },
  { name: "Ghana", code: "GH", flag: "🇬🇭", dialCode: "+233", phoneLength: 9 },
  { name: "Gibraltar", code: "GI", flag: "🇬🇮", dialCode: "+350", phoneLength: 8 },
  { name: "Greece", code: "GR", flag: "🇬🇷", dialCode: "+30", phoneLength: 10 },
  { name: "Greenland", code: "GL", flag: "🇬🇱", dialCode: "+299", phoneLength: 6 },
  { name: "Grenada", code: "GD", flag: "🇬🇩", dialCode: "+1473", phoneLength: 7 },
  { name: "Guadeloupe", code: "GP", flag: "🇬🇵", dialCode: "+590", phoneLength: 9 },
  { name: "Guam", code: "GU", flag: "🇬🇺", dialCode: "+1671", phoneLength: 7 },
  { name: "Guatemala", code: "GT", flag: "🇬🇹", dialCode: "+502", phoneLength: 8 },
  { name: "Guernsey", code: "GG", flag: "🇬🇬", dialCode: "+44", phoneLength: 10 },
  { name: "Guinea", code: "GN", flag: "🇬🇳", dialCode: "+224", phoneLength: 9 },
  { name: "Guinea-Bissau", code: "GW", flag: "🇬🇼", dialCode: "+245", phoneLength: 7 },
  { name: "Guyana", code: "GY", flag: "🇬🇾", dialCode: "+592", phoneLength: 7 },
  { name: "Haiti", code: "HT", flag: "🇭🇹", dialCode: "+509", phoneLength: 8 },
  { name: "Honduras", code: "HN", flag: "🇭🇳", dialCode: "+504", phoneLength: 8 },
  { name: "Hong Kong", code: "HK", flag: "🇭🇰", dialCode: "+852", phoneLength: 8 },
  { name: "Hungary", code: "HU", flag: "🇭🇺", dialCode: "+36", phoneLength: 9 },
  { name: "Iceland", code: "IS", flag: "🇮🇸", dialCode: "+354", phoneLength: 7 },
  { name: "India", code: "IN", flag: "🇮🇳", dialCode: "+91", phoneLength: 10 },
  { name: "Indonesia", code: "ID", flag: "🇮🇩", dialCode: "+62", phoneLength: 11 },
  { name: "Iran", code: "IR", flag: "🇮🇷", dialCode: "+98", phoneLength: 10 },
  { name: "Iraq", code: "IQ", flag: "🇮🇶", dialCode: "+964", phoneLength: 10 },
  { name: "Ireland", code: "IE", flag: "🇮🇪", dialCode: "+353", phoneLength: 9 },
  { name: "Isle of Man", code: "IM", flag: "🇮🇲", dialCode: "+44", phoneLength: 10 },
  { name: "Israel", code: "IL", flag: "🇮🇱", dialCode: "+972", phoneLength: 9 },
  { name: "Italy", code: "IT", flag: "🇮🇹", dialCode: "+39", phoneLength: 10 },
  { name: "Ivory Coast", code: "CI", flag: "🇨🇮", dialCode: "+225", phoneLength: 10 },
  { name: "Jamaica", code: "JM", flag: "🇯🇲", dialCode: "+1876", phoneLength: 7 },
  { name: "Japan", code: "JP", flag: "🇯🇵", dialCode: "+81", phoneLength: 10 },
  { name: "Jersey", code: "JE", flag: "🇯🇪", dialCode: "+44", phoneLength: 10 },
  { name: "Jordan", code: "JO", flag: "🇯🇴", dialCode: "+962", phoneLength: 9 },
  { name: "Kazakhstan", code: "KZ", flag: "🇰🇿", dialCode: "+7", phoneLength: 10 },
  { name: "Kenya", code: "KE", flag: "🇰🇪", dialCode: "+254", phoneLength: 9 },
  { name: "Kiribati", code: "KI", flag: "🇰🇮", dialCode: "+686", phoneLength: 8 },
  { name: "Kuwait", code: "KW", flag: "🇰🇼", dialCode: "+965", phoneLength: 8 },
  { name: "Kyrgyzstan", code: "KG", flag: "🇰🇬", dialCode: "+996", phoneLength: 9 },
  { name: "Laos", code: "LA", flag: "🇱🇦", dialCode: "+856", phoneLength: 10 },
  { name: "Latvia", code: "LV", flag: "🇱🇻", dialCode: "+371", phoneLength: 8 },
  { name: "Lebanon", code: "LB", flag: "🇱🇧", dialCode: "+961", phoneLength: 8 },
  { name: "Lesotho", code: "LS", flag: "🇱🇸", dialCode: "+266", phoneLength: 8 },
  { name: "Liberia", code: "LR", flag: "🇱🇷", dialCode: "+231", phoneLength: 8 },
  { name: "Libya", code: "LY", flag: "🇱🇾", dialCode: "+218", phoneLength: 9 },
  { name: "Liechtenstein", code: "LI", flag: "🇱🇮", dialCode: "+423", phoneLength: 7 },
  { name: "Lithuania", code: "LT", flag: "🇱🇹", dialCode: "+370", phoneLength: 8 },
  { name: "Luxembourg", code: "LU", flag: "🇱🇺", dialCode: "+352", phoneLength: 9 },
  { name: "Macao", code: "MO", flag: "🇲🇴", dialCode: "+853", phoneLength: 8 },
  { name: "Macedonia", code: "MK", flag: "🇲🇰", dialCode: "+389", phoneLength: 8 },
  { name: "Madagascar", code: "MG", flag: "🇲🇬", dialCode: "+261", phoneLength: 9 },
  { name: "Malawi", code: "MW", flag: "🇲🇼", dialCode: "+265", phoneLength: 9 },
  { name: "Malaysia", code: "MY", flag: "🇲🇾", dialCode: "+60", phoneLength: 10 },
  { name: "Maldives", code: "MV", flag: "🇲🇻", dialCode: "+960", phoneLength: 7 },
  { name: "Mali", code: "ML", flag: "🇲🇱", dialCode: "+223", phoneLength: 8 },
  { name: "Malta", code: "MT", flag: "🇲🇹", dialCode: "+356", phoneLength: 8 },
  { name: "Marshall Islands", code: "MH", flag: "🇲🇭", dialCode: "+692", phoneLength: 7 },
  { name: "Martinique", code: "MQ", flag: "🇲🇶", dialCode: "+596", phoneLength: 9 },
  { name: "Mauritania", code: "MR", flag: "🇲🇷", dialCode: "+222", phoneLength: 8 },
  { name: "Mauritius", code: "MU", flag: "🇲🇺", dialCode: "+230", phoneLength: 8 },
  { name: "Mayotte", code: "YT", flag: "🇾🇹", dialCode: "+262", phoneLength: 9 },
  { name: "Mexico", code: "MX", flag: "🇲🇽", dialCode: "+52", phoneLength: 10 },
  { name: "Micronesia", code: "FM", flag: "🇫🇲", dialCode: "+691", phoneLength: 7 },
  { name: "Moldova", code: "MD", flag: "🇲🇩", dialCode: "+373", phoneLength: 8 },
  { name: "Monaco", code: "MC", flag: "🇲🇨", dialCode: "+377", phoneLength: 8 },
  { name: "Mongolia", code: "MN", flag: "🇲🇳", dialCode: "+976", phoneLength: 8 },
  { name: "Montenegro", code: "ME", flag: "🇲🇪", dialCode: "+382", phoneLength: 8 },
  { name: "Montserrat", code: "MS", flag: "🇲🇸", dialCode: "+1664", phoneLength: 7 },
  { name: "Morocco", code: "MA", flag: "🇲🇦", dialCode: "+212", phoneLength: 9 },
  { name: "Mozambique", code: "MZ", flag: "🇲🇿", dialCode: "+258", phoneLength: 9 },
  { name: "Myanmar", code: "MM", flag: "🇲🇲", dialCode: "+95", phoneLength: 9 },
  { name: "Namibia", code: "NA", flag: "🇳🇦", dialCode: "+264", phoneLength: 9 },
  { name: "Nauru", code: "NR", flag: "🇳🇷", dialCode: "+674", phoneLength: 7 },
  { name: "Nepal", code: "NP", flag: "🇳🇵", dialCode: "+977", phoneLength: 10 },
  { name: "Netherlands", code: "NL", flag: "🇳🇱", dialCode: "+31", phoneLength: 9 },
  { name: "Netherlands Antilles", code: "AN", flag: "🇦🇳", dialCode: "+599", phoneLength: 7 },
  { name: "New Caledonia", code: "NC", flag: "🇳🇨", dialCode: "+687", phoneLength: 6 },
  { name: "New Zealand", code: "NZ", flag: "🇳🇿", dialCode: "+64", phoneLength: 9 },
  { name: "Nicaragua", code: "NI", flag: "🇳🇮", dialCode: "+505", phoneLength: 8 },
  { name: "Niger", code: "NE", flag: "🇳🇪", dialCode: "+227", phoneLength: 8 },
  { name: "Nigeria", code: "NG", flag: "🇳🇬", dialCode: "+234", phoneLength: 10 },
  { name: "Niue", code: "NU", flag: "🇳🇺", dialCode: "+683", phoneLength: 4 },
  { name: "Norfolk Island", code: "NF", flag: "🇳🇫", dialCode: "+672", phoneLength: 6 },
  { name: "North Korea", code: "KP", flag: "🇰🇵", dialCode: "+850", phoneLength: 10 },
  { name: "Northern Mariana Islands", code: "MP", flag: "🇲🇵", dialCode: "+1670", phoneLength: 7 },
  { name: "Norway", code: "NO", flag: "🇳🇴", dialCode: "+47", phoneLength: 8 },
  { name: "Oman", code: "OM", flag: "🇴🇲", dialCode: "+968", phoneLength: 8 },
  { name: "Pakistan", code: "PK", flag: "🇵🇰", dialCode: "+92", phoneLength: 10 },
  { name: "Palau", code: "PW", flag: "🇵🇼", dialCode: "+680", phoneLength: 7 },
  { name: "Palestine", code: "PS", flag: "🇵🇸", dialCode: "+970", phoneLength: 9 },
  { name: "Panama", code: "PA", flag: "🇵🇦", dialCode: "+507", phoneLength: 8 },
  { name: "Papua New Guinea", code: "PG", flag: "🇵🇬", dialCode: "+675", phoneLength: 8 },
  { name: "Paraguay", code: "PY", flag: "🇵🇾", dialCode: "+595", phoneLength: 9 },
  { name: "Peru", code: "PE", flag: "🇵🇪", dialCode: "+51", phoneLength: 9 },
  { name: "Philippines", code: "PH", flag: "🇵🇭", dialCode: "+63", phoneLength: 10 },
  { name: "Pitcairn", code: "PN", flag: "🇵🇳", dialCode: "+64", phoneLength: 9 },
  { name: "Poland", code: "PL", flag: "🇵🇱", dialCode: "+48", phoneLength: 9 },
  { name: "Portugal", code: "PT", flag: "🇵🇹", dialCode: "+351", phoneLength: 9 },
  { name: "Puerto Rico", code: "PR", flag: "🇵🇷", dialCode: "+1787", phoneLength: 7 },
  { name: "Qatar", code: "QA", flag: "🇶🇦", dialCode: "+974", phoneLength: 8 },
  { name: "Reunion", code: "RE", flag: "🇷🇪", dialCode: "+262", phoneLength: 9 },
  { name: "Romania", code: "RO", flag: "🇷🇴", dialCode: "+40", phoneLength: 9 },
  { name: "Russia", code: "RU", flag: "🇷🇺", dialCode: "+7", phoneLength: 10 },
  { name: "Rwanda", code: "RW", flag: "🇷🇼", dialCode: "+250", phoneLength: 9 },
  { name: "Saint Barthelemy", code: "BL", flag: "🇧🇱", dialCode: "+590", phoneLength: 9 },
  { name: "Saint Helena", code: "SH", flag: "🇸🇭", dialCode: "+290", phoneLength: 4 },
  { name: "Saint Kitts and Nevis", code: "KN", flag: "🇰🇳", dialCode: "+1869", phoneLength: 7 },
  { name: "Saint Lucia", code: "LC", flag: "🇱🇨", dialCode: "+1758", phoneLength: 7 },
  { name: "Saint Martin", code: "MF", flag: "🇲🇫", dialCode: "+590", phoneLength: 9 },
  { name: "Saint Pierre and Miquelon", code: "PM", flag: "🇵🇲", dialCode: "+508", phoneLength: 6 },
  { name: "Saint Vincent and the Grenadines", code: "VC", flag: "🇻🇨", dialCode: "+1784", phoneLength: 7 },
  { name: "Samoa", code: "WS", flag: "🇼🇸", dialCode: "+685", phoneLength: 7 },
  { name: "San Marino", code: "SM", flag: "🇸🇲", dialCode: "+378", phoneLength: 10 },
  { name: "Sao Tome and Principe", code: "ST", flag: "🇸🇹", dialCode: "+239", phoneLength: 7 },
  { name: "Saudi Arabia", code: "SA", flag: "🇸🇦", dialCode: "+966", phoneLength: 9 },
  { name: "Senegal", code: "SN", flag: "🇸🇳", dialCode: "+221", phoneLength: 9 },
  { name: "Serbia", code: "RS", flag: "🇷🇸", dialCode: "+381", phoneLength: 9 },
  { name: "Seychelles", code: "SC", flag: "🇸🇨", dialCode: "+248", phoneLength: 7 },
  { name: "Sierra Leone", code: "SL", flag: "🇸🇱", dialCode: "+232", phoneLength: 8 },
  { name: "Singapore", code: "SG", flag: "🇸🇬", dialCode: "+65", phoneLength: 8 },
  { name: "Slovakia", code: "SK", flag: "🇸🇰", dialCode: "+421", phoneLength: 9 },
  { name: "Slovenia", code: "SI", flag: "🇸🇮", dialCode: "+386", phoneLength: 8 },
  { name: "Solomon Islands", code: "SB", flag: "🇸🇧", dialCode: "+677", phoneLength: 7 },
  { name: "Somalia", code: "SO", flag: "🇸🇴", dialCode: "+252", phoneLength: 8 },
  { name: "South Africa", code: "ZA", flag: "🇿🇦", dialCode: "+27", phoneLength: 9 },
  { name: "South Georgia and the South Sandwich Islands", code: "GS", flag: "🇬🇸", dialCode: "+500", phoneLength: 5 },
  { name: "South Korea", code: "KR", flag: "🇰🇷", dialCode: "+82", phoneLength: 10 },
  { name: "Spain", code: "ES", flag: "🇪🇸", dialCode: "+34", phoneLength: 9 },
  { name: "Sri Lanka", code: "LK", flag: "🇱🇰", dialCode: "+94", phoneLength: 9 },
  { name: "Sudan", code: "SD", flag: "🇸🇩", dialCode: "+249", phoneLength: 9 },
  { name: "Suriname", code: "SR", flag: "🇸🇷", dialCode: "+597", phoneLength: 7 },
  { name: "Svalbard and Jan Mayen", code: "SJ", flag: "🇸🇯", dialCode: "+47", phoneLength: 8 },
  { name: "Swaziland", code: "SZ", flag: "🇸🇿", dialCode: "+268", phoneLength: 8 },
  { name: "Sweden", code: "SE", flag: "🇸🇪", dialCode: "+46", phoneLength: 9 },
  { name: "Switzerland", code: "CH", flag: "🇨🇭", dialCode: "+41", phoneLength: 9 },
  { name: "Syria", code: "SY", flag: "🇸🇾", dialCode: "+963", phoneLength: 9 },
  { name: "Taiwan", code: "TW", flag: "🇹🇼", dialCode: "+886", phoneLength: 9 },
  { name: "Tajikistan", code: "TJ", flag: "🇹🇯", dialCode: "+992", phoneLength: 9 },
  { name: "Tanzania", code: "TZ", flag: "🇹🇿", dialCode: "+255", phoneLength: 9 },
  { name: "Thailand", code: "TH", flag: "🇹🇭", dialCode: "+66", phoneLength: 9 },
  { name: "Timor-Leste", code: "TL", flag: "🇹🇱", dialCode: "+670", phoneLength: 8 },
  { name: "Togo", code: "TG", flag: "🇹🇬", dialCode: "+228", phoneLength: 8 },
  { name: "Tokelau", code: "TK", flag: "🇹🇰", dialCode: "+690", phoneLength: 4 },
  { name: "Tonga", code: "TO", flag: "🇹🇴", dialCode: "+676", phoneLength: 5 },
  { name: "Trinidad and Tobago", code: "TT", flag: "🇹🇹", dialCode: "+1868", phoneLength: 7 },
  { name: "Tunisia", code: "TN", flag: "🇹🇳", dialCode: "+216", phoneLength: 8 },
  { name: "Turkey", code: "TR", flag: "🇹🇷", dialCode: "+90", phoneLength: 10 },
  { name: "Turkmenistan", code: "TM", flag: "🇹🇲", dialCode: "+993", phoneLength: 8 },
  { name: "Turks and Caicos Islands", code: "TC", flag: "🇹🇨", dialCode: "+1649", phoneLength: 7 },
  { name: "Tuvalu", code: "TV", flag: "🇹🇻", dialCode: "+688", phoneLength: 5 },
  { name: "Uganda", code: "UG", flag: "🇺🇬", dialCode: "+256", phoneLength: 9 },
  { name: "Ukraine", code: "UA", flag: "🇺🇦", dialCode: "+380", phoneLength: 9 },
  { name: "United Arab Emirates", code: "AE", flag: "🇦🇪", dialCode: "+971", phoneLength: 9 },
  { name: "United Kingdom", code: "GB", flag: "🇬🇧", dialCode: "+44", phoneLength: 10 },
  { name: "United States", code: "US", flag: "🇺🇸", dialCode: "+1", phoneLength: 10 },
  { name: "United States Minor Outlying Islands", code: "UM", flag: "🇺🇲", dialCode: "+1", phoneLength: 10 },
  { name: "Uruguay", code: "UY", flag: "🇺🇾", dialCode: "+598", phoneLength: 8 },
  { name: "Uzbekistan", code: "UZ", flag: "🇺🇿", dialCode: "+998", phoneLength: 9 },
  { name: "Vanuatu", code: "VU", flag: "🇻🇺", dialCode: "+678", phoneLength: 7 },
  { name: "Vatican City", code: "VA", flag: "🇻🇦", dialCode: "+39", phoneLength: 10 },
  { name: "Venezuela", code: "VE", flag: "🇻🇪", dialCode: "+58", phoneLength: 10 },
  { name: "Vietnam", code: "VN", flag: "🇻🇳", dialCode: "+84", phoneLength: 9 },
  { name: "Virgin Islands, British", code: "VG", flag: "🇻🇬", dialCode: "+1284", phoneLength: 7 },
  { name: "Virgin Islands, U.S.", code: "VI", flag: "🇻🇮", dialCode: "+1340", phoneLength: 7 },
  { name: "Wallis and Futuna", code: "WF", flag: "🇼🇫", dialCode: "+681", phoneLength: 6 },
  { name: "Western Sahara", code: "EH", flag: "🇪🇭", dialCode: "+212", phoneLength: 9 },
  { name: "Yemen", code: "YE", flag: "🇾🇪", dialCode: "+967", phoneLength: 9 },
  { name: "Zambia", code: "ZM", flag: "🇿🇲", dialCode: "+260", phoneLength: 9 },
  { name: "Zimbabwe", code: "ZW", flag: "🇿🇼", dialCode: "+263", phoneLength: 9 }
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
    const [validationMessage, setValidationMessage] = React.useState("");

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

    const validatePhoneNumber = (number: string, country: Country) => {
      const cleanNumber = number.replace(/\D/g, ''); // Remove non-digits
      const expectedLength = country.phoneLength;
      
      if (cleanNumber.length === 0) {
        setValidationMessage("");
        return;
      }
      
      if (cleanNumber.length < expectedLength) {
        setValidationMessage(`Phone number should be ${expectedLength} digits for ${country.name}. You entered ${cleanNumber.length} digits.`);
      } else if (cleanNumber.length > expectedLength) {
        setValidationMessage(`Phone number should be ${expectedLength} digits for ${country.name}. You entered ${cleanNumber.length} digits.`);
      } else {
        setValidationMessage("");
      }
    };

    const handleCountrySelect = (country: Country) => {
      setSelectedCountry(country);
      setIsDropdownOpen(false);
      setSearchTerm("");
      const fullNumber = `${country.dialCode} ${phoneNumber}`.trim();
      onChange?.(fullNumber);
      validatePhoneNumber(phoneNumber, country);
    };

    const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const newPhoneNumber = e.target.value;
      setPhoneNumber(newPhoneNumber);
      const fullNumber = `${selectedCountry.dialCode} ${newPhoneNumber}`.trim();
      onChange?.(fullNumber);
      validatePhoneNumber(newPhoneNumber, selectedCountry);
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

    const isValid = validationMessage === "";
    const hasInput = phoneNumber.replace(/\D/g, '').length > 0;

    return (
      <div className="relative">
        <div className="flex">
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
              hasInput && !isValid && "border-red-500 focus:border-red-500 focus:ring-red-500",
              hasInput && isValid && "border-green-500 focus:border-green-500 focus:ring-green-500",
              className
            )}
            placeholder={`${selectedCountry.phoneLength} digits expected`}
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

        {/* Validation Message */}
        {hasInput && validationMessage && (
          <div className="mt-1 text-sm text-red-600 flex items-center gap-1">
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
            {validationMessage}
          </div>
        )}

        {/* Success Message */}
        {hasInput && isValid && phoneNumber.replace(/\D/g, '').length === selectedCountry.phoneLength && (
          <div className="mt-1 text-sm text-green-600 flex items-center gap-1">
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            Valid phone number for {selectedCountry.name}
          </div>
        )}
      </div>
    );
  }
);

PhoneInput.displayName = "PhoneInput";

export { PhoneInput };
