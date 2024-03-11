<?php

namespace App\Http\Controllers\Api;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Http\Requests\StoreUserRequest;
use App\Http\Requests\UpdateUserRequest;
use App\Http\Resources\UserResource;
use App\Models\User;
use App\Models\AuthorizedUser; 
use App\Http\Resources\AuthorizedUserResource;
use App\Http\Requests\StoreUnAuthoUserRequest;
use App\Models\UnAuthorizedUser;
use App\Http\Resources\UnAuthorizedUserResource;

class UserController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Resources\Json\AnonymousResourceCollection
     */
    public function index()
    {
        return AuthorizedUserResource::collection(AuthorizedUser::query()->orderBy('id')->paginate(10));
    }
    public function indexUsers()
    {
        return UserResource::collection(User::query()->orderBy('id')->paginate(10));
    }
    public function showUnauth()
    {
        return UnAuthorizedUserResource::collection(UnauthorizedUser::query()->orderBy('id')->paginate(10));
    }
    public function customDestroy(AuthorizedUser $user)
    {
        $user->delete();

        // Reset the auto-increment value manually
        DB::statement('ALTER TABLE authorized_users AUTO_INCREMENT = 1');

        return response("", 204);
    }
    public function store(StoreUserRequest $request)
    {
        $validatedData = $request->validated();
    
        // Create a new AuthorizedUser record
        $authorizedUser = AuthorizedUser::create($validatedData);
    
        return response()->json(['message' => 'User created successfully', 'data' => $authorizedUser], 201);
    }

    public function update(UpdateUserRequest $request, User $user)
    {
        $data = $request->validated();
        if (isset($data['password'])) {
            $data['password'] = bcrypt($data['password']);
        }
        $user->update($data);

        return new UserResource($user);
    }

    public function destroyUsers(User $user)
    {
        // Get the ID before deletion
        $idBeforeDeletion = $user->id;
    
        $user->delete();
    
        // Get the minimum ID from the remaining authorized users
        $minId = User::min('id');
    
        // Update IDs sequentially
        User::where('id', '>', $idBeforeDeletion)->decrement('id');
    
        return response("", 204);
    }
    public function destroy(AuthorizedUser $user)
    {
        // Get the ID before deletion
        $idBeforeDeletion = $user->id;
    
        $user->delete();
    
        // Get the minimum ID from the remaining authorized users
        $minId = AuthorizedUser::min('id');
    
        // Update IDs sequentially
        AuthorizedUser::where('id', '>', $idBeforeDeletion)->decrement('id');
    
        return response("", 204);
    }
    public function destroyUnauth(UnauthorizedUser $user)
    {
        // Get the ID before deletion
        $idBeforeDeletion = $user->id;
    
        $user->delete();
    
        // Get the minimum ID from the remaining authorized users
        $minId = UnauthorizedUser::min('id');
    
        // Update IDs sequentially
        UnauthorizedUser::where('id', '>', $idBeforeDeletion)->decrement('id');
    
        return response("", 204);
    }

    public function showAdmin(Request $request)
{
    $user = $request->user();

    if ($user->role === 'admin') {
        return response()->json($user);
    } else {
        return response()->json(['error' => 'Unauthorized'], 403);
    }
}
public function storeUnAuthUser(StoreUnAuthoUserRequest $request)
{

    $validatedData = $request->validated();
    try {
        $unauthorizedUser = UnAuthorizedUser::create($validatedData);

        // ... (Optional) Send email notification using sendEmailNotification method

        return response()->json([
            'message' => 'User created successfully',
            'data' => new UnAuthorizedUserResource($unauthorizedUser),
        ], 201);
    } catch (\Exception $e) {
        Log::error('Error creating user: ' . $e->getMessage());
        return response()->json([
            'error' => 'Failed to create user',
            'message' => $e->getMessage(),
        ], 500);
    }
}
public function authorizeUnauthorizedUser(UnauthorizedUser $user)
{
    try {
        // Create a new AuthorizedUser record from the unauthorized user data
        $authorizedUser = AuthorizedUser::create([
            'name' => $user->name,
            'email' => $user->email,
            'department' => $user->department,
            'role' => $user->role,
        ]);

        // Delete the unauthorized user record
        $user->delete();

        return response()->json([
            'message' => 'User authorized successfully',
            'data' => new AuthorizedUserResource($authorizedUser),
        ], 201);
    } catch (\Exception $e) {
        Log::error('Error authorizing user: ' . $e->getMessage());
        return response()->json([
            'error' => 'Failed to authorize user',
            'message' => $e->getMessage(),
        ], 500);
    }
}

}