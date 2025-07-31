import { useState } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Dialog, DialogTrigger, DialogContent } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { CalendarDays } from 'lucide-react';
import { format } from 'date-fns';

const colors = { room1: 'bg-red-600', room2: 'bg-blue-600' };
const monthDays = Array.from({ length: 31 }, (_, i) => i + 1);

export default function KiralamaTakvimi() {
  const [records, setRecords] = useState([]);
  const [form, setForm] = useState({
    name: '', surname: '', guests: '', room: 'room1', date: '', time: '',
  });

  function addRecord() {
    setRecords([...records, form]);
    setForm({ name: '', surname: '', guests: '', room: 'room1', date: '', time: '' });
  }

  function deleteRecord(date, room, time) {
    setRecords(records.filter(r => !(r.date === date && r.room === room && r.time === time)));
  }

  function getDayRecords(day) {
    return records.filter(r => parseInt(r.date.split('-')[2]) === day);
  }

  function renderBox(day) {
    const dayRecords = getDayRecords(day);
    const room1 = dayRecords.filter(r => r.room === 'room1');
    const room2 = dayRecords.filter(r => r.room === 'room2');

    return (
      <div key={day} className="w-24 h-24 border border-white text-sm relative rounded overflow-hidden">
        <div className="absolute top-1 left-1 text-white font-bold">{day}</div>
        {room1.length > 0 && (
          <div className={`${colors.room1} w-full ${room2.length > 0 ? 'h-1/2' : 'h-full'} relative`}>
            {room1.length > 1 && <div className="absolute bottom-1 right-1 text-white text-xs">{room1.length}</div>}
          </div>
        )}
        {room2.length > 0 && (
          <div className={`${colors.room2} w-full ${room1.length > 0 ? 'h-1/2' : 'h-full'} relative`}>
            {room2.length > 1 && <div className="absolute bottom-1 right-1 text-white text-xs">{room2.length}</div>}
          </div>
        )}
        <div className="absolute inset-0">
          {[...room1, ...room2].map((rec, i) => (
            <div
              key={i}
              className="absolute inset-0 z-10 cursor-pointer"
              onClick={() => deleteRecord(rec.date, rec.room, rec.time)}
              title={`${rec.name} ${rec.surname} (${rec.guests} kişi) ${rec.time}`}
            />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="dark bg-black text-white min-h-screen p-6">
      <h1 className="text-2xl mb-4 font-bold">Garden Aframe - Kiralama Takvimi</h1>
      <div className="grid grid-cols-7 gap-2 mb-8">
        {monthDays.map(day => renderBox(day))}
      </div>
      <Dialog>
        <DialogTrigger asChild>
          <Button className="bg-green-600 text-white">+ Ekle</Button>
        </DialogTrigger>
        <DialogContent className="bg-zinc-900 text-white">
          <h2 className="text-xl mb-4">Yeni Müşteri Kaydı</h2>
          <div className="grid gap-2">
            <Input placeholder="Ad" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} />
            <Input placeholder="Soyad" value={form.surname} onChange={e => setForm({ ...form, surname: e.target.value })} />
            <Input placeholder="Kişi Sayısı" type="number" value={form.guests} onChange={e => setForm({ ...form, guests: e.target.value })} />
            <Input placeholder="Tarih (YYYY-MM-DD)" value={form.date} onChange={e => setForm({ ...form, date: e.target.value })} />
            <Input placeholder="Saat (örn. 14:00)" value={form.time} onChange={e => setForm({ ...form, time: e.target.value })} />
            <select value={form.room} onChange={e => setForm({ ...form, room: e.target.value })} className="bg-zinc-800 p-2 rounded">
              <option value="room1">Kırmızı Oda</option>
              <option value="room2">Mavi Oda</option>
            </select>
            <Button className="bg-blue-600 text-white mt-2" onClick={addRecord}>Kaydet</Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
