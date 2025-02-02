import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Users } from "lucide-react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";


export default function AboutUs() {
  const [date, setDate] = React.useState(null);
  const [time, setTime] = React.useState("");
    
  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("Submitting:", {
      date,
      time,
      name: event.target.name.value,
      email: event.target.email.value,
    });
  };

  // Function to format time in 12-hour format
  const formatTime = (timeString) => {
    const [hours, minutes] = timeString.split(':');
    const date = new Date();
    date.setHours(parseInt(hours), parseInt(minutes));
    return date.toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    });
  };

  return (
    <div className="min-h-screen bg-black text-white p-8 flex items-center justify-center">
      <div className="max-w-4xl w-full mx-auto bg-black bg-opacity-50 backdrop-blur-lg rounded-xl shadow-2xl overflow-hidden">
        <div className="md:flex">
          <div className="md:w-1/2 p-8">
            <h1 className="text-4xl font-bold mb-6 bg-gradient-to-r from-purple-400 to-pink-600 bg-clip-text text-transparent">
              About Us
            </h1>
            <p className="mb-8 text-gray-300 leading-relaxed">
              We're a forward-thinking company dedicated to revolutionizing the way you work. Our innovative solutions
              and expert team are here to help you achieve your goals. Book a meeting with us today and let's shape the
              future together!
            </p>
            <div className="flex items-center text-gray-400 mb-8">
              <Users className="w-5 h-5 mr-2" />
              <span>Join over 10,000 satisfied clients</span>
            </div>
          </div>

          <div className="md:w-1/2 p-8 bg-gray-800 bg-opacity-50">
            <h2 className="text-2xl font-semibold mb-6 text-center">Schedule a Meeting</h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="name" className="text-gray-300">
                  Name
                </Label>
                <Input id="name" className="bg-gray-700 border-gray-600 text-white" required />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email" className="text-gray-300">
                  Email
                </Label>
                <Input id="email" type="email" className="bg-gray-700 border-gray-600 text-white" required />
              </div>

              <div className="space-y-2">
                <Label className="text-gray-300">Date</Label>
                <DatePicker
                  selected={date}
                  onChange={(date) => setDate(date)}
                  dateFormat="MMMM d, yyyy"
                  minDate={new Date()}
                  className="w-full bg-gray-700 border border-gray-600 text-white rounded-md p-2"
                  placeholderText="Select a date"
                  wrapperClassName="w-full"
                />
              </div>

              <div className="space-y-2">
                <Label className="text-gray-300">Time</Label>
                <Select onValueChange={setTime}>
                  <SelectTrigger className="w-full bg-gray-700 border-gray-600 text-white">
                    <SelectValue placeholder="Select a time" />
                  </SelectTrigger>
                  <SelectContent className="bg-gray-800 border-gray-700 text-white">
                    {["09:00", "10:00", "11:00", "12:00", "13:00", "14:00", "15:00", "16:00", "17:00"].map((t) => (
                      <SelectItem key={t} value={t}>
                        {formatTime(t)}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <Button type="submit" className="w-full bg-gradient-to-r from-purple-500 to-pink-600">
                Book a meeting
              </Button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}