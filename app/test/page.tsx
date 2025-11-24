import { createClient } from "@/utils/supabase/server";


const TestPage = async () => {
    const supabase = await createClient();
    const data = await supabase.from("branch").select();
    console.log(data);
  return <div>data</div>;
};
export default TestPage;
