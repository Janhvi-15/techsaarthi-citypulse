import { useState, useEffect } from "react";
// import Navbar3 from "../components/Navbar3";

const FieldStaff = () => {
  const [staff, setStaff] = useState({ 
    name: "James Carter", 
    department: "Roads",
    _id: "",
    email: ""
  });
  
  const [assignments, setAssignments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [resolving, setResolving] = useState(null);

  // Get staff data from localStorage or auth context
  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem('user') || '{}');
    if (userData._id || userData.email) {
      setStaff(prev => ({ 
        ...prev, 
        _id: userData._id || '',
        email: userData.email || '',
        name: userData.name || prev.name,
        department: userData.department || prev.department
      }));
    }
  }, []);

  // Fetch assignments for this staff member
  useEffect(() => {
    // Fetch by email (preferred) or by ID as fallback
    if (staff.email) {
      fetchAssignmentsByEmail();
    } else if (staff._id) {
      fetchAssignmentsById();
    }
  }, [staff._id, staff.email]);

  const fetchAssignmentsByEmail = async () => {
    try {
      setLoading(true);
      const response = await fetch(
        `http://localhost:3000/api/v1/staff/assignments/email/${encodeURIComponent(staff.email)}?status=Assigned,In Progress`,
        {
          headers: {
            'Content-Type': 'application/json'
          }
        }
      );

      const data = await response.json();
      
      if (data.success) {
        setAssignments(data.data);
      } else {
        console.error('Failed to fetch assignments:', data.message);
      }
    } catch (error) {
      console.error('Error fetching assignments:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchAssignmentsById = async () => {
    try {
      setLoading(true);
      const response = await fetch(
        `http://localhost:3000/api/v1/staff/assignments/staff/${staff._id}?status=Assigned,In Progress`,
        {
          headers: {
            'Content-Type': 'application/json'
          }
        }
      );

      const data = await response.json();
      
      if (data.success) {
        setAssignments(data.data);
      } else {
        console.error('Failed to fetch assignments:', data.message);
      }
    } catch (error) {
      console.error('Error fetching assignments:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleResolve = async (assignmentId, incidentId) => {
    if (!window.confirm('Mark this task as resolved?')) {
      return;
    }

    try {
      setResolving(assignmentId);

      // Update assignment status to Completed
      const response = await fetch(
        `http://localhost:3000/api/v1/staff/assignments/${assignmentId}/status`,
        {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            status: 'Completed',
            notes: `Task completed by ${staff.name}`
          })
        }
      );

      const data = await response.json();

      if (data.success) {
        // Remove the assignment from the list
        setAssignments(prev => prev.filter(a => a._id !== assignmentId));
        
        alert('✅ Task marked as resolved!');
      } else {
        alert(`Error: ${data.message}`);
      }
    } catch (error) {
      console.error('Error resolving task:', error);
      alert('Failed to resolve task');
    } finally {
      setResolving(null);
    }
  };

  const getPriorityBadgeClass = (priority) => {
    const classes = {
      'Low': 'bg-green-50 text-green-700 border-green-200',
      'Medium': 'bg-yellow-50 text-yellow-700 border-yellow-200',
      'High': 'bg-orange-50 text-orange-700 border-orange-200',
      'Critical': 'bg-red-50 text-red-700 border-red-200'
    };
    return classes[priority] || classes.Medium;
  };

  const getStatusBadgeClass = (status) => {
    const classes = {
      'Assigned': 'bg-blue-50 text-blue-700 border-blue-200',
      'In Progress': 'bg-purple-50 text-purple-700 border-purple-200',
      'Completed': 'bg-green-50 text-green-700 border-green-200',
      'Cancelled': 'bg-gray-50 text-gray-700 border-gray-200'
    };
    return classes[status] || classes.Assigned;
  };

  const getCategoryBadgeClass = (category) => {
    return 'bg-orange-50 text-orange-700 border-orange-200';
  };

  const badge = (text, cls) => (
    <span className={`text-sm px-3 py-1 rounded-full border ${cls}`}>
      {text}
    </span>
  );

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      month: 'numeric', 
      day: 'numeric', 
      year: 'numeric' 
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        {/* <Navbar3 /> */}
        <div className="max-w-6xl mx-auto px-6 py-10">
          <div className="text-center py-20">
            <div className="text-xl">Loading assignments...</div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* <Navbar3 /> */}
      <div className="max-w-6xl mx-auto px-6 py-10">
        {/* Logged in card */}
        <div className="bg-white border rounded-2xl p-6 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-[#0F2A4D] text-white flex items-center justify-center text-xl">
              🔧
            </div>
            <div>
              <div className="text-sm text-gray-500">Logged in as</div>
              <div className="font-semibold text-lg">
                {staff.name} — {staff.department}{" "}
                <span className="text-gray-400">▾</span>
              </div>
              {staff.email && (
                <div className="text-xs text-gray-400">{staff.email}</div>
              )}
            </div>
          </div>
          <div className="text-right">
            <div className="text-3xl font-bold">{assignments.length}</div>
            <div className="text-sm text-gray-500">Active Tasks</div>
          </div>
        </div>

        {/* Active Assignments */}
        <div className="mt-10 flex items-center gap-3 text-gray-700">
          <span className="text-xl">⚠️</span>
          <h2 className="text-lg font-semibold tracking-wide">
            ACTIVE ASSIGNMENTS
          </h2>
        </div>

        {/* No assignments message */}
        {assignments.length === 0 && (
          <div className="mt-4 bg-white border rounded-2xl p-10 text-center">
            <div className="text-6xl mb-4">✅</div>
            <h3 className="text-xl font-semibold text-gray-700">All Caught Up!</h3>
            <p className="text-gray-500 mt-2">You have no active assignments at the moment.</p>
          </div>
        )}

        {/* Assignment cards */}
        <div className="space-y-4 mt-4">
          {assignments.map((assignment) => (
            <div 
              key={assignment._id} 
              className="bg-white border rounded-2xl p-6 shadow-sm"
            >
              <div className="flex flex-wrap items-center gap-3">
                <span className="text-sm font-semibold text-gray-700">
                  {assignment.incidentId?.code || 'N/A'}
                </span>
                {badge(
                  assignment.priority,
                  getPriorityBadgeClass(assignment.priority)
                )}
                {badge(
                  assignment.assignmentStatus,
                  getStatusBadgeClass(assignment.assignmentStatus)
                )}
                <div className="flex-1" />
                {badge(
                  assignment.category,
                  getCategoryBadgeClass(assignment.category)
                )}
              </div>

              <h3 className="mt-4 text-xl font-bold">{assignment.title}</h3>
              <p className="mt-2 text-gray-600">
                {assignment.incidentId?.description || assignment.notes || 'No description'}
              </p>

              <div className="mt-4 flex flex-wrap gap-6 text-sm text-gray-600">
                <div className="flex items-center gap-2">
                  📍 {assignment.address}
                </div>
                <div className="flex items-center gap-2">
                  🕒 Assigned: {formatDate(assignment.assignedAt)}
                </div>
              </div>

              <button
                onClick={() => handleResolve(assignment._id, assignment.incidentId?._id)}
                disabled={resolving === assignment._id}
                className={`mt-6 w-full py-3 rounded-xl font-semibold transition-colors
                  ${resolving === assignment._id 
                    ? 'bg-gray-400 cursor-not-allowed' 
                    : 'bg-[#0F2A4D] hover:bg-[#0b2240]'
                  } text-white`}
              >
                {resolving === assignment._id ? 'Resolving...' : 'Mark as Resolved'}
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FieldStaff;