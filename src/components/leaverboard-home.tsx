"use client"

import { useState, useEffect } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { CalendarIcon, XIcon } from 'lucide-react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

// Mock data for demonstration
const celebrities = [
  { 
    name: "Elon Musk", 
    handle: "@elonmusk", 
    leaveDate: "2023-11-10", 
    reason: "Focusing on X",
    predictedReturn: "2024-01-01",
    votes: { willReturn: 1500, wontReturn: 500 }
  },
  { 
    name: "Taylor Swift", 
    handle: "@taylorswift13", 
    leaveDate: "2023-11-09", 
    reason: "Taking a break",
    predictedReturn: "2023-12-25",
    votes: { willReturn: 2000, wontReturn: 200 }
  },
  { 
    name: "Leonardo DiCaprio", 
    handle: "@LeoDiCaprio", 
    leaveDate: "2023-11-08", 
    reason: "Environmental focus",
    predictedReturn: "2024-03-15",
    votes: { willReturn: 800, wontReturn: 1200 }
  },
  { 
    name: "Beyoncé", 
    handle: "@Beyonce", 
    leaveDate: "2023-11-07", 
    reason: "New project launch",
    predictedReturn: "2024-02-14",
    votes: { willReturn: 3000, wontReturn: 100 }
  },
  { 
    name: "Tom Hanks", 
    handle: "@tomhanks", 
    leaveDate: "2023-11-06", 
    reason: "Social media detox",
    predictedReturn: "2024-06-30",
    votes: { willReturn: 1200, wontReturn: 800 }
  },
]

export function LeaverboardHome() {
  const [celebData, setCelebData] = useState(celebrities)
  const [selectedCeleb, setSelectedCeleb] = useState(null)
  const [returnPrediction, setReturnPrediction] = useState({ days: 0, months: 0, years: 0 })
  const [showComingSoon, setShowComingSoon] = useState(true)

  useEffect(() => {
    setShowComingSoon(true)
  }, [])

  const handleVote = (handle: string, voteType: 'willReturn' | 'wontReturn') => {
    setCelebData(prevData => 
      prevData.map(celeb => 
        celeb.handle === handle 
          ? { ...celeb, votes: { ...celeb.votes, [voteType]: celeb.votes[voteType] + 1 } }
          : celeb
      )
    )
  }

  const handleReturnPrediction = () => {
    if (selectedCeleb) {
      const leaveDate = new Date(selectedCeleb.leaveDate)
      const predictedDate = new Date(leaveDate.getTime())
      predictedDate.setDate(predictedDate.getDate() + returnPrediction.days)
      predictedDate.setMonth(predictedDate.getMonth() + returnPrediction.months)
      predictedDate.setFullYear(predictedDate.getFullYear() + returnPrediction.years)

      setCelebData(prevData =>
        prevData.map(celeb =>
          celeb.handle === selectedCeleb.handle
            ? { ...celeb, predictedReturn: predictedDate.toISOString().split('T')[0] }
            : celeb
        )
      )
      setSelectedCeleb(null)
      setReturnPrediction({ days: 0, months: 0, years: 0 })
    }
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <Card className="mb-8">
        <CardHeader>
          <CardTitle className="text-4xl font-bold text-center">Leaverboard</CardTitle>
          <CardDescription className="text-center text-lg">
            Tracking celebrities who've announced they're leaving Twitter and betting on their return
          </CardDescription>
        </CardHeader>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Celebrity Exodus Leaderboard</CardTitle>
          <CardDescription>
            The latest high-profile individuals to bid farewell to the Twitterverse. Vote on whether you think they'll return!
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[250px]">Celebrity</TableHead>
                <TableHead>Leave Date</TableHead>
                <TableHead>Predicted Return</TableHead>
                <TableHead>Return Likelihood</TableHead>
                <TableHead>Your Vote</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {celebData.map((celeb) => (
                <TableRow key={celeb.handle}>
                  <TableCell className="font-medium">
                    <div className="flex items-center space-x-3">
                      <Avatar>
                        <AvatarImage src={`/placeholder.svg?height=40&width=40`} alt={celeb.name} />
                        <AvatarFallback>{celeb.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                      </Avatar>
                      <div>
                        <p>{celeb.name}</p>
                        <p className="text-sm text-muted-foreground">{celeb.handle}</p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>{celeb.leaveDate}</TableCell>
                  <TableCell>
                    <div className="flex items-center">
                      <CalendarIcon className="mr-2 h-4 w-4 opacity-70" />{" "}
                      <span>{celeb.predictedReturn}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="w-[150px]">
                      <Progress 
                        value={(celeb.votes.willReturn / (celeb.votes.willReturn + celeb.votes.wontReturn)) * 100} 
                        className="h-2"
                      />
                      <div className="flex justify-between text-xs text-muted-foreground mt-1">
                        <span>{celeb.votes.willReturn}</span>
                        <span>{celeb.votes.wontReturn}</span>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex space-x-2">
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button 
                            size="sm" 
                            variant="outline"
                            onClick={() => setSelectedCeleb(celeb)}
                          >
                            Will Return
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-[425px]">
                          <DialogHeader>
                            <DialogTitle>Predict Return Time</DialogTitle>
                            <DialogDescription>
                              How long do you think it will take {selectedCeleb?.name} to return to Twitter?
                            </DialogDescription>
                          </DialogHeader>
                          <div className="grid gap-4 py-4">
                            <div className="grid grid-cols-3 items-center gap-4">
                              <Label htmlFor="days">Days</Label>
                              <Input
                                id="days"
                                type="number"
                                className="col-span-2"
                                value={returnPrediction.days}
                                onChange={(e) => setReturnPrediction(prev => ({ ...prev, days: parseInt(e.target.value) || 0 }))}
                              />
                            </div>
                            <div className="grid grid-cols-3 items-center gap-4">
                              <Label htmlFor="months">Months</Label>
                              <Input
                                id="months"
                                type="number"
                                className="col-span-2"
                                value={returnPrediction.months}
                                onChange={(e) => setReturnPrediction(prev => ({ ...prev, months: parseInt(e.target.value) || 0 }))}
                              />
                            </div>
                            <div className="grid grid-cols-3 items-center gap-4">
                              <Label htmlFor="years">Years</Label>
                              <Input
                                id="years"
                                type="number"
                                className="col-span-2"
                                value={returnPrediction.years}
                                onChange={(e) => setReturnPrediction(prev => ({ ...prev, years: parseInt(e.target.value) || 0 }))}
                              />
                            </div>
                          </div>
                          <Button onClick={() => { handleVote(selectedCeleb.handle, 'willReturn'); handleReturnPrediction(); }}>
                            Submit Prediction
                          </Button>
                        </DialogContent>
                      </Dialog>
                      <Button 
                        size="sm" 
                        variant="outline"
                        onClick={() => handleVote(celeb.handle, 'wontReturn')}
                      >
                        Won't Return
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {showComingSoon && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <Card className="w-full max-w-md">
            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle className="text-2xl font-bold">Coming Soon!</CardTitle>
                <Button variant="ghost" size="icon" onClick={() => setShowComingSoon(false)}>
                  <XIcon className="h-4 w-4" />
                  <span className="sr-only">Close</span>
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-lg mb-4">
                Get ready for the ultimate celebrity Twitter exodus tracker!
              </p>
              <p className="mb-4">
                The Leaverboard is coming soon, featuring:
              </p>
              <ul className="list-disc list-inside mb-4">
                <li>Real-time updates on celebrity Twitter departures</li>
                <li>Community voting on potential returns</li>
                <li>Predicted return dates</li>
                <li>Leaderboard of the most anticipated comebacks</li>
              </ul>
              <p>
                Stay tuned for the launch and be the first to track, predict, and discuss the great Twitter exodus!
              </p>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  )
}