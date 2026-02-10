import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { LogOut } from "lucide-react";

interface Props {
  onConfirm: () => void;
  children: React.ReactNode;
}

export default function LogoutConfirmDialog({ onConfirm, children }: Props) {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        {children}
      </AlertDialogTrigger>

      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle className="font-normal">Log out?</AlertDialogTitle>
          <AlertDialogDescription className="font-sans">
            Are you sure you want to log out of your account?
            You will need to sign in again to access your dashboard.
          </AlertDialogDescription>
        </AlertDialogHeader>

        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>

          <AlertDialogAction
            className="bg-red-500 hover:bg-red-600 text-white"
            onClick={onConfirm}
          >
            <LogOut className="mr-2 h-4 w-4" />
            Logout
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
